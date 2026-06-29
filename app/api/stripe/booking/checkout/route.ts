import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { calculateBookingPrice, generateBookingId, getBookingProductName } from '@/lib/booking/pricing';
import { validatePromoCode } from '@/lib/booking/promo-codes';
import { bookingCheckoutSchema } from '@/lib/booking/schema';
import { checkBookingDatesAvailable } from '@/lib/booking/blocked-ranges';
import { getStripe, getStripeSecretKey, isStripeConfigured, normalizeEnvSecret } from '@/lib/stripe/server';
import { getClientIpFromRequest } from '@/lib/security/client-ip';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { verifyTurnstileToken } from '@/lib/security/turnstile';
import { absoluteUrl } from '@/lib/seo';

const MAX_BODY_BYTES = 16_384;

function genericError(status: number, error = 'Request rejected') {
  return NextResponse.json({ ok: false, error }, { status });
}

/**
 * POST /api/stripe/booking/checkout
 *
 * Crée une session de paiement Stripe pour une réservation
 *
 * Body:
 * {
 *   name: string
 *   email: string
 *   phone?: string
 *   checkInDate: "YYYY-MM-DD"
 *   checkOutDate: "YYYY-MM-DD"
 *   guestCount: number (1-8)
 *   specialRequests?: string
 *   locale: "fr" | "es" | "en"
 *   turnstileToken: string
 *   termsAccepted: boolean
 * }
 */
export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ ok: false, error: 'Payments not configured' }, { status: 503 });
  }

  const ip = getClientIpFromRequest(request);
  const rateLimit = checkRateLimit(`stripe-booking-checkout:${ip}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests' },
      {
        status: 429,
        headers: rateLimit.retryAfterSeconds ? { 'Retry-After': String(rateLimit.retryAfterSeconds) } : undefined,
      },
    );
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return genericError(413);
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return genericError(413);
    }
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return genericError(400);
  }

  const record = body as Record<string, unknown>;

  // Honeypot check (anti-spam)
  if (typeof record._hp === 'string' && record._hp.trim().length > 0) {
    return NextResponse.json({ ok: false, error: 'Request rejected' }, { status: 400 });
  }

  // Verify CAPTCHA
  const turnstileToken = typeof record.turnstileToken === 'string' ? record.turnstileToken : '';
  let turnstileOk = false;
  try {
    turnstileOk = await verifyTurnstileToken(turnstileToken, ip);
  } catch (error) {
    console.error('[STRIPE:booking:checkout] turnstile verify error', error);
  }
  if (!turnstileOk) {
    return genericError(403, 'Captcha verification failed');
  }

  // Parse & validate request
  let parsed;
  try {
    parsed = bookingCheckoutSchema.parse(body);
  } catch (error) {
    console.error('[STRIPE:booking:checkout] validation error', error);
    return NextResponse.json(
      { ok: false, error: 'Validation failed', code: 'validation_error' },
      { status: 400 },
    );
  }

  // Validate promo code (if provided)
  const promoValidation = await validatePromoCode(parsed.promoCode, parsed.email);
  if (!promoValidation.valid) {
    return NextResponse.json(
      { ok: false, error: 'Invalid promo code', code: `promo_${promoValidation.error}` },
      { status: 400 },
    );
  }

  // Calculate price
  let pricing;
  try {
    pricing = calculateBookingPrice(
      parsed.checkInDate,
      parsed.checkOutDate,
      parsed.guestCount,
      promoValidation.discountPercent,
    );
  } catch (error) {
    console.error('[STRIPE:booking:checkout] pricing error', error);
    return NextResponse.json({ ok: false, error: 'Invalid booking parameters' }, { status: 400 });
  }

  const availability = await checkBookingDatesAvailable(
    parsed.checkInDate,
    parsed.checkOutDate,
  ).catch((error) => {
    console.error('[STRIPE:booking:checkout] availability error', error);
    return { available: false as const, reason: 'Availability check failed' };
  });

  if (!availability.available) {
    return NextResponse.json(
      { ok: false, error: 'Selected dates are not available' },
      { status: 409 },
    );
  }

  // Generate booking ID
  const bookingId = generateBookingId();
  const productName = getBookingProductName(parsed.locale, pricing.nights, parsed.guestCount);
  const successUrl = `${absoluteUrl('/sejourner', parsed.locale)}?booking_success=1&session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`;
  const cancelUrl = `${absoluteUrl('/sejourner', parsed.locale)}?booking_canceled=1`;

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer_email: parsed.email,
      locale: parsed.locale === 'en' ? 'en' : parsed.locale === 'fr' ? 'fr' : 'es',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: pricing.amountCents,
            product_data: {
              name: productName,
              description: `${parsed.checkInDate} → ${parsed.checkOutDate} (${parsed.guestCount} guest${parsed.guestCount > 1 ? 's' : ''})`,
            },
          },
        },
      ],
      metadata: {
        bookingId,
        guestName: parsed.name,
        guestEmail: parsed.email,
        guestPhone: parsed.phone ?? '',
        checkInDate: parsed.checkInDate,
        checkOutDate: parsed.checkOutDate,
        guestCount: String(parsed.guestCount),
        specialRequests: parsed.specialRequests?.slice(0, 500) ?? '',
        promoCode: promoValidation.code || '',
        promoDiscountPercent: String(promoValidation.discountPercent),
        locale: parsed.locale,
        amountCents: String(pricing.amountCents),
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (!session.url) {
      console.error('[STRIPE:booking:checkout] session.url is null', { sessionId: session.id });
      return NextResponse.json({ ok: false, error: 'Checkout unavailable' }, { status: 502 });
    }

    return NextResponse.json({
      ok: true,
      url: session.url,
      bookingId,
    });
  } catch (error) {
    const stripeError = error as { type?: string; code?: string; message?: string };
    console.error('[STRIPE:booking:checkout] session creation failed', {
      type: stripeError.type,
      code: stripeError.code,
      message: stripeError.message,
    });
    return NextResponse.json(
      { ok: false, error: 'Checkout unavailable', code: 'stripe_error' },
      { status: 502 },
    );
  }
}

export async function GET() {
  const stripeConfigured = isStripeConfigured();
  const turnstileConfigured = Boolean(normalizeEnvSecret(process.env.TURNSTILE_SECRET_KEY));
  const stripeKey = getStripeSecretKey();

  let stripeReachable = false;
  let stripeStatus: string | undefined;

  if (stripeConfigured) {
    try {
      const stripe = getStripe();
      await stripe.balance.retrieve();
      stripeReachable = true;
      stripeStatus = 'ready';
    } catch (error) {
      const stripeError = error as { type?: string; code?: string; message?: string };
      stripeStatus = stripeError.code || stripeError.type || 'connection_failed';
      console.error('[STRIPE:booking:checkout] health check failed', {
        type: stripeError.type,
        code: stripeError.code,
        message: stripeError.message,
      });
    }
  }

  return NextResponse.json({
    stripeConfigured,
    turnstileConfigured,
    stripeReachable,
    stripeStatus,
    stripeKeyPrefix: stripeKey?.slice(0, 16),
    stripeKeyLength: stripeKey?.length ?? 0,
    expectedKeyPrefix: 'sk_live_51TebID',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cueva-thalia.com',
  });
}
