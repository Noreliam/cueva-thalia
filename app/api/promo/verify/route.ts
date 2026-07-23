import { NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyInfluenceurCode } from '@/lib/influenceurs/verify';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export const runtime = 'nodejs';

const bodySchema = z.object({
  code: z.string().min(1).max(64),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  if (!isSupabaseConfigured()) {
    console.error('[PROMO:verify] Supabase not configured');
    return NextResponse.json({ valid: false }, { status: 503 });
  }

  try {
    const result = await verifyInfluenceurCode(parsed.data.code);
    if (!result.valid) {
      return NextResponse.json({ valid: false });
    }

    return NextResponse.json({
      valid: true,
      pourcentage: result.pourcentage,
      discountPercent: result.discountPercent,
    });
  } catch (error) {
    console.error('[PROMO:verify] unexpected error', error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
