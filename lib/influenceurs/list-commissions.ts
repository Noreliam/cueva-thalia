import { getSupabaseAdmin } from '@/lib/supabase/server';

export type CommissionWithInfluenceur = {
  id: string;
  influenceur_code: string;
  stripe_session_id: string;
  montant_reservation: number;
  commission_due: number;
  statut: string;
  created_at: string;
  influenceur_nom: string;
  influenceur_email: string;
};

export async function listCommissionsWithInfluenceurs(): Promise<CommissionWithInfluenceur[]> {
  const supabase = getSupabaseAdmin();

  const { data: commissions, error: commissionsError } = await supabase
    .from('commissions')
    .select(
      'id, influenceur_code, stripe_session_id, montant_reservation, commission_due, statut, created_at',
    )
    .order('created_at', { ascending: false });

  if (commissionsError) {
    throw commissionsError;
  }

  if (!commissions?.length) {
    return [];
  }

  const codes = [...new Set(commissions.map((row) => row.influenceur_code))];
  const { data: influenceurs, error: influenceursError } = await supabase
    .from('influenceurs')
    .select('code, nom, email')
    .in('code', codes);

  if (influenceursError) {
    throw influenceursError;
  }

  const influenceursByCode = new Map(
    (influenceurs ?? []).map((row) => [row.code, row]),
  );

  return commissions.map((row) => {
    const influenceur = influenceursByCode.get(row.influenceur_code);
    return {
      id: row.id,
      influenceur_code: row.influenceur_code,
      stripe_session_id: row.stripe_session_id,
      montant_reservation: Number(row.montant_reservation),
      commission_due: Number(row.commission_due),
      statut: row.statut,
      created_at: row.created_at,
      influenceur_nom: influenceur?.nom ?? '—',
      influenceur_email: influenceur?.email ?? '—',
    };
  });
}
