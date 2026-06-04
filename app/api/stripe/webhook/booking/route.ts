import { NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripe, isStripeConfigured } from '@/lib/stripe/server';

export const runtime = 'nodejs';

function getWebhookSecret(): string | undefined {
  return process.env.STRIPE_WEBHOOK_SECRET?.trim();
}

/**
 * POST /api/stripe/webhook/booking
 *
 * Traite les webhooks Stripe pour les réservations
 * Events:
 * - checkout.session.completed (paiement réussi)
 * - charge.dispute.created (litige)
 */
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
  } catch (error) {
    console.error('[STRIPE:webhook:booking] signature verification failed', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.payment_status === 'paid') {
        const bookingId = session.metadata?.bookingId;

        if (!bookingId) {
          console.error('[STRIPE:webhook:booking] missing bookingId in metadata', {
            sessionId: session.id,
          });
          return NextResponse.json({ received: true });
        }

        // TODO: Implement booking confirmation logic
        // Pour l'instant, on log juste la réservation
        console.log('[STRIPE:webhook:booking] booking confirmed', {
          bookingId,
          sessionId: session.id,
          customerEmail: session.customer_email,
          metadata: session.metadata,
        });

        // Prochaines étapes:
        // 1. Créer un enregistrement de réservation en base de données
        // 2. Envoyer un email de confirmation au client
        // 3. Envoyer une notification à Manon
        // 4. (Optionnel) Bloquer les dates dans Smoobu
      }
    } else if (event.type === 'charge.dispute.created') {
      const charge = event.data.object as Stripe.Dispute;
      console.warn('[STRIPE:webhook:booking] dispute created', {
        chargeId: charge.charge,
        amount: charge.amount,
        reason: charge.reason,
      });

      // TODO: Notify admin about dispute
    }
  } catch (error) {
    console.error('[STRIPE:webhook:booking] handler error', { type: event.type, error });
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
