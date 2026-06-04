import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripeSecretKey(): string | undefined {
  return process.env.STRIPE_SECRET_KEY?.trim();
}

export function isStripeConfigured(): boolean {
  return Boolean(getStripeSecretKey());
}

export function getStripe(): Stripe {
  const key = getStripeSecretKey();
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured');
  }
  if (!stripeClient) {
    stripeClient = new Stripe(key, {
      apiVersion: '2026-05-27.dahlia',
      typescript: true,
    });
  }
  return stripeClient;
}
