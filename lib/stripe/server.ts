import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function normalizeEnvSecret(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  if (!trimmed) {
    return undefined;
  }
  return trimmed.replace(/^["']|["']$/g, '');
}

export function getStripeSecretKey(): string | undefined {
  const key = normalizeEnvSecret(process.env.STRIPE_SECRET_KEY);
  if (!key) {
    return undefined;
  }
  if (!/^sk_(live|test)_/.test(key)) {
    console.error('[STRIPE] STRIPE_SECRET_KEY has an invalid format');
    return undefined;
  }
  return key;
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
