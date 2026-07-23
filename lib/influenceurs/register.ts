import { generateInfluenceurCode } from '@/lib/influenceurs/generate-code';
import { INFLUENCEUR_COMMISSION_PERCENT } from '@/lib/influenceurs/constants';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export type RegisterInfluenceurInput = {
  nom: string;
  email: string;
  instagram?: string;
};

export type RegisterInfluenceurResult =
  | { ok: true; code: string; trackingUrl: string }
  | { ok: false; error: 'supabase_unconfigured' | 'email_taken' | 'code_generation_failed' };

const MAX_CODE_ATTEMPTS = 12;

function normalizeInstagram(handle: string | undefined): string | null {
  const trimmed = handle?.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed.replace(/^@+/, '');
}

export async function registerInfluenceur(
  input: RegisterInfluenceurInput,
  trackingUrl: string,
): Promise<RegisterInfluenceurResult> {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'supabase_unconfigured' };
  }

  const supabase = getSupabaseAdmin();
  const email = input.email.trim().toLowerCase();
  const nom = input.nom.trim();
  const instagram = normalizeInstagram(input.instagram);

  const { data: existingEmail } = await supabase
    .from('influenceurs')
    .select('id')
    .eq('email', email)
    .maybeSingle();

  if (existingEmail) {
    return { ok: false, error: 'email_taken' };
  }

  for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt++) {
    let code: string;
    try {
      code = generateInfluenceurCode(nom);
    } catch {
      return { ok: false, error: 'code_generation_failed' };
    }

    const { data: existingCode } = await supabase
      .from('influenceurs')
      .select('id')
      .eq('code', code)
      .maybeSingle();

    if (existingCode) {
      continue;
    }

    const { error: insertError } = await supabase.from('influenceurs').insert({
      nom,
      email,
      instagram,
      code,
      pourcentage: INFLUENCEUR_COMMISSION_PERCENT,
    });

    if (insertError) {
      if (insertError.code === '23505') {
        continue;
      }
      console.error('[INFLUENCEUR:register] insert failed', insertError);
      return { ok: false, error: 'code_generation_failed' };
    }

    return { ok: true, code, trackingUrl: `${trackingUrl}?ref=${code}` };
  }

  return { ok: false, error: 'code_generation_failed' };
}
