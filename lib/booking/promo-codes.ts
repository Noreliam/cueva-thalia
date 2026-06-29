import { WELCOME_DISCOUNT_CODE } from '@/lib/newsletter/constants';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

const WELCOME_VALIDITY_DAYS = 30;
const WELCOME_DISCOUNT_PERCENT = 10;

export type PromoCodeError = 'invalid' | 'expired' | 'email_mismatch';

export type PromoCodeValidation =
  | { valid: true; code: string; discountPercent: number }
  | { valid: false; error: PromoCodeError };

export function normalizePromoCode(code: string | undefined | null): string {
  return (code ?? '').trim().toUpperCase();
}

export async function validatePromoCode(
  code: string | undefined,
  email: string,
): Promise<PromoCodeValidation> {
  const normalized = normalizePromoCode(code);

  if (!normalized) {
    return { valid: true, code: '', discountPercent: 0 };
  }

  if (normalized !== WELCOME_DISCOUNT_CODE) {
    return { valid: false, error: 'invalid' };
  }

  if (isSupabaseConfigured()) {
    const emailNorm = email.trim().toLowerCase();
    const { data, error } = await getSupabaseAdmin()
      .from('newsletter_subscribers')
      .select('subscribed_at, unsubscribed_at')
      .eq('email', emailNorm)
      .maybeSingle();

    if (error || !data || data.unsubscribed_at) {
      return { valid: false, error: 'email_mismatch' };
    }

    const subscribedAt = new Date(data.subscribed_at);
    const elapsed = Date.now() - subscribedAt.getTime();
    if (elapsed > WELCOME_VALIDITY_DAYS * 24 * 60 * 60 * 1000) {
      return { valid: false, error: 'expired' };
    }
  }

  return { valid: true, code: normalized, discountPercent: WELCOME_DISCOUNT_PERCENT };
}

export function applyPromoDiscount(baseTotalEUR: number, discountPercent: number) {
  const discountEUR = Math.round(baseTotalEUR * discountPercent) / 100;
  const finalTotal = Math.max(0, Math.round((baseTotalEUR - discountEUR) * 100) / 100);
  return { discountEUR, finalTotal };
}
