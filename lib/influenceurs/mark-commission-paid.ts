import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function markCommissionPaid(id: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('commissions')
    .update({ statut: 'payée' })
    .eq('id', id)
    .eq('statut', 'en_attente')
    .select('id')
    .maybeSingle();

  if (error) {
    throw error;
  }

  return Boolean(data);
}
