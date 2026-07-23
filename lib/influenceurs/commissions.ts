import type Stripe from 'stripe';
import { normalizePromoCode } from '@/lib/booking/promo-codes';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export async function recordInfluenceurCommissionFromSession(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const clientReferenceId = session.client_reference_id?.trim();
  if (!clientReferenceId) {
    return;
  }

  const amountTotal = session.amount_total;
  if (amountTotal == null || amountTotal < 1) {
    console.warn('[STRIPE:commission] missing amount_total', { sessionId: session.id });
    return;
  }

  if (!isSupabaseConfigured()) {
    console.warn('[STRIPE:commission] Supabase not configured', { sessionId: session.id });
    return;
  }

  const code = normalizePromoCode(clientReferenceId);
  const supabase = getSupabaseAdmin();

  const { data: influenceur, error: fetchError } = await supabase
    .from('influenceurs')
    .select('code, pourcentage')
    .eq('code', code)
    .maybeSingle();

  if (fetchError) {
    console.error('[STRIPE:commission] influenceur fetch failed', {
      sessionId: session.id,
      code,
      error: fetchError,
    });
    return;
  }

  if (!influenceur) {
    console.warn('[STRIPE:commission] influenceur not found', {
      sessionId: session.id,
      code,
    });
    return;
  }

  const pourcentage = Number(influenceur.pourcentage);
  const montantReservation = Math.round(amountTotal) / 100;
  const commissionDue = Math.round(montantReservation * pourcentage) / 100;

  const { data: existing, error: existingError } = await supabase
    .from('commissions')
    .select('id')
    .eq('stripe_session_id', session.id)
    .maybeSingle();

  if (existingError) {
    console.error('[STRIPE:commission] duplicate check failed', {
      sessionId: session.id,
      error: existingError,
    });
    return;
  }

  if (existing) {
    return;
  }

  const { error: insertError } = await supabase.from('commissions').insert({
    influenceur_code: influenceur.code,
    stripe_session_id: session.id,
    montant_reservation: montantReservation,
    commission_due: commissionDue,
    statut: 'en_attente',
  });

  if (insertError) {
    console.error('[STRIPE:commission] insert failed', {
      sessionId: session.id,
      code: influenceur.code,
      error: insertError,
    });
    return;
  }

  console.log('[STRIPE:commission] recorded', {
    sessionId: session.id,
    influenceurCode: influenceur.code,
    montantReservation,
    commissionDue,
  });
}
