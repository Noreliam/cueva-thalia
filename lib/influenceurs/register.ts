import { generateInfluenceurCode } from '@/lib/influenceurs/generate-code';
import { INFLUENCEUR_COMMISSION_PERCENT } from '@/lib/influenceurs/constants';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export type RegisterInfluenceurInput = {
  nom: string;
  email: string;
  instagram?: string;
};

export type RegisterInfluenceurResult =
  | { ok: true; code: string; trackingUrl: string; alreadyRegistered?: boolean }
  | {
      ok: false;
      error: 'supabase_unconfigured' | 'code_generation_failed' | 'database_error' | 'tables_missing';
    };

const MAX_CODE_ATTEMPTS = 12;

type InfluenceurInsertRow = {
  nom: string;
  email: string;
  code: string;
  pourcentage: number;
  instagram?: string;
};

function normalizeInstagram(handle: string | undefined): string | null {
  const trimmed = handle?.trim();
  if (!trimmed) {
    return null;
  }
  return trimmed.replace(/^@+/, '');
}

function buildTrackingUrl(trackingUrl: string, code: string): string {
  return `${trackingUrl}?ref=${code}`;
}

function isMissingInstagramColumn(error: { code?: string; message?: string; details?: string }): boolean {
  const haystack = `${error.message ?? ''} ${error.details ?? ''}`.toLowerCase();
  return error.code === 'PGRST204' || haystack.includes('instagram');
}

function isMultipleRowsError(error: { code?: string; message?: string }): boolean {
  return error.code === 'PGRST116';
}

async function findInfluenceurCodeByEmail(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  email: string,
): Promise<{ code: string | null; error: 'database_error' | 'tables_missing' | null }> {
  const { data, error } = await supabase
    .from('influenceurs')
    .select('code')
    .eq('email', email)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('[INFLUENCEUR:register] email lookup failed', error);
    if (isMissingInfluenceursTable(error)) {
      return { code: null, error: 'tables_missing' };
    }
    if (isMultipleRowsError(error)) {
      // Should not happen with limit(1), but guard anyway.
      return { code: null, error: 'database_error' };
    }
    return { code: null, error: 'database_error' };
  }

  return { code: data?.[0]?.code ?? null, error: null };
}

function isMissingInfluenceursTable(error: { code?: string; message?: string; details?: string }): boolean {
  const haystack = `${error.message ?? ''} ${error.details ?? ''}`.toLowerCase();
  return (
    error.code === 'PGRST205' ||
    error.code === '42P01' ||
    (haystack.includes('influenceurs') &&
      (haystack.includes('does not exist') ||
        haystack.includes('could not find') ||
        haystack.includes('schema cache')))
  );
}

function isDuplicateEmailError(error: { code?: string; message?: string; details?: string }): boolean {
  if (error.code !== '23505') {
    return false;
  }
  const haystack = `${error.message ?? ''} ${error.details ?? ''}`.toLowerCase();
  return haystack.includes('email');
}

async function insertInfluenceurRow(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  row: InfluenceurInsertRow,
) {
  const { error } = await supabase.from('influenceurs').insert(row);

  if (!error) {
    return null;
  }

  if (isMissingInstagramColumn(error) && 'instagram' in row) {
    console.warn('[INFLUENCEUR:register] instagram column missing — retrying without instagram');
    const { instagram: _removed, ...withoutInstagram } = row;
    const retry = await supabase.from('influenceurs').insert(withoutInstagram);
    return retry.error;
  }

  return error;
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

  const existingLookup = await findInfluenceurCodeByEmail(supabase, email);
  if (existingLookup.error) {
    return { ok: false, error: existingLookup.error };
  }

  if (existingLookup.code) {
    return {
      ok: true,
      code: existingLookup.code,
      trackingUrl: buildTrackingUrl(trackingUrl, existingLookup.code),
      alreadyRegistered: true,
    };
  }

  for (let attempt = 0; attempt < MAX_CODE_ATTEMPTS; attempt++) {
    let code: string;
    try {
      code = generateInfluenceurCode(nom);
    } catch {
      return { ok: false, error: 'code_generation_failed' };
    }

    const { data: existingCode, error: codeLookupError } = await supabase
      .from('influenceurs')
      .select('id')
      .eq('code', code)
      .maybeSingle();

    if (codeLookupError) {
      console.error('[INFLUENCEUR:register] code lookup failed', codeLookupError);
      if (isMissingInfluenceursTable(codeLookupError)) {
        return { ok: false, error: 'tables_missing' };
      }
      return { ok: false, error: 'database_error' };
    }

    if (existingCode) {
      continue;
    }

    const insertRow: InfluenceurInsertRow = {
      nom,
      email,
      code,
      pourcentage: INFLUENCEUR_COMMISSION_PERCENT,
    };
    if (instagram) {
      insertRow.instagram = instagram;
    }

    const insertError = await insertInfluenceurRow(supabase, insertRow);

    if (insertError) {
      if (isMissingInfluenceursTable(insertError)) {
        return { ok: false, error: 'tables_missing' };
      }
      if (isDuplicateEmailError(insertError)) {
        const duplicateLookup = await findInfluenceurCodeByEmail(supabase, email);
        if (duplicateLookup.code) {
          return {
            ok: true,
            code: duplicateLookup.code,
            trackingUrl: buildTrackingUrl(trackingUrl, duplicateLookup.code),
            alreadyRegistered: true,
          };
        }
      }
      if (insertError.code === '23505') {
        continue;
      }
      console.error('[INFLUENCEUR:register] insert failed', insertError);
      return { ok: false, error: 'database_error' };
    }

    return { ok: true, code, trackingUrl: buildTrackingUrl(trackingUrl, code) };
  }

  return { ok: false, error: 'code_generation_failed' };
}
