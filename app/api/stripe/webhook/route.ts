import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { fulfillBookingOrder, orderFromBookingCheckoutSession } from '@/lib/booking/fulfill';
import { fulfillGiftVoucherOrder, orderFromCheckoutSession } from '@/lib/gift-voucher/fulfill';
import { getStripe, isStripeConfigured } from '@/lib/stripe/server';

export const runtime = 'nodejs';

function getWebhookSecret(): string | undefined {
  return process.env.STRIPE_WEBHOOK_SECRET?.trim();
}

export async function POST(request: Request) {
  if (!isStripeConfigured() || !getWebhookSecret()) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 });
  }

  const signature = request.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const payload = await request.text();
  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(payload, signature, getWebhookSecret()!);
  } catch {
    console.error('[STRIPE:webhook] signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status === 'paid') {
        const booking = orderFromBookingCheckoutSession(session);
        if (booking) {
          await fulfillBookingOrder(booking);
        } else {
          const order = orderFromCheckoutSession(session);
          if (order) {
            await fulfillGiftVoucherOrder(order);
          } else {
            console.error('[STRIPE:webhook] unrecognized checkout session metadata', {
              sessionId: session.id,
            });
          }
        }
      }
    }
  } catch {
    console.error('[STRIPE:webhook] handler error', { type: event.type });
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
