import { normalizePromoCode } from '@/lib/booking/promo-codes';
import { INFLUENCEUR_DISCOUNT_PERCENT } from '@/lib/influenceurs/constants';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export type InfluenceurVerification =
  | { valid: true; code: string; pourcentage: number; discountPercent: number }
  | { valid: false };

export async function verifyInfluenceurCode(
  code: string | undefined | null,
): Promise<InfluenceurVerification> {
  const normalized = normalizePromoCode(code);
  if (!normalized) {
    return { valid: false };
  }

  if (!isSupabaseConfigured()) {
    return { valid: false };
  }

  const { data, error } = await getSupabaseAdmin()
    .from('influenceurs')
    .select('pourcentage')
    .eq('code', normalized)
    .maybeSingle();

  if (error || !data) {
    return { valid: false };
  }

  return {
    valid: true,
    code: normalized,
    pourcentage: Number(data.pourcentage),
    discountPercent: INFLUENCEUR_DISCOUNT_PERCENT,
  };
}
