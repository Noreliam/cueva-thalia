import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { absoluteUrl } from '@/lib/seo';
import { resolveGiftAmountCents, getGiftProductName } from '@/lib/gift-voucher/pricing';
import { giftVoucherCheckoutSchema } from '@/lib/gift-voucher/schema';
import { getStripe, isStripeConfigured } from '@/lib/stripe/server';
import { getClientIpFromRequest } from '@/lib/security/client-ip';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { verifyTurnstileToken } from '@/lib/security/turnstile';

const MAX_BODY_BYTES = 16_384;

function genericError(status: number) {
  return NextResponse.json({ ok: false, error: 'Request rejected' }, { status });
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ ok: false, error: 'Payments not configured' }, { status: 503 });
  }

  const ip = getClientIpFromRequest(request);
  const rateLimit = checkRateLimit(`stripe-checkout:${ip}`);
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests' },
      {
        status: 429,
        headers: rateLimit.retryAfterSeconds
          ? { 'Retry-After': String(rateLimit.retryAfterSeconds) }
          : undefined,
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
  if (typeof record._hp === 'string' && record._hp.trim().length > 0) {
    return NextResponse.json({ ok: false, error: 'Request rejected' }, { status: 400 });
  }

  const turnstileToken = typeof record.turnstileToken === 'string' ? record.turnstileToken : '';
  const turnstileOk = await verifyTurnstileToken(turnstileToken, ip);
  if (!turnstileOk) {
    return genericError(403);
  }

  let parsed;
  try {
    parsed = giftVoucherCheckoutSchema.parse(body);
  } catch {
    return genericError(400);
  }

  const pricing = resolveGiftAmountCents(parsed.giftType, parsed.customAmountEuros);
  if (!pricing.ok) {
    return NextResponse.json({ ok: false, error: 'Invalid amount' }, { status: 400 });
  }

  const voucherCode = randomUUID();
  const productName = getGiftProductName(parsed.locale, parsed.giftType);
  const successUrl = `${absoluteUrl('/bon-cadeau/merci', parsed.locale)}?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${absoluteUrl('/bon-cadeau', parsed.locale)}?canceled=1#commander`;

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
              description: `Cueva Thalía — ${parsed.recipientName}`,
            },
          },
        },
      ],
      metadata: {
        voucherCode,
        buyerName: parsed.name,
        buyerEmail: parsed.email,
        recipientName: parsed.recipientName,
        giftType: parsed.giftType,
        message: parsed.message?.slice(0, 500) ?? '',
        locale: parsed.locale,
        amountCents: String(pricing.amountCents),
        phone: parsed.phone ?? '',
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_intent_data: {
        metadata: {
          voucherCode,
          giftType: parsed.giftType,
        },
      },
    });

    if (!session.url) {
      return NextResponse.json({ ok: false, error: 'Checkout unavailable' }, { status: 502 });
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    console.error('[STRIPE:checkout] session creation failed');
    return NextResponse.json({ ok: false, error: 'Checkout unavailable' }, { status: 502 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
