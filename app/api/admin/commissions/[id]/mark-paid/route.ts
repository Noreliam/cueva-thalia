import { NextResponse } from 'next/server';
import { isCommissionsAdminRequestAuthenticated } from '@/lib/admin/commissions-auth';
import { markCommissionPaid } from '@/lib/influenceurs/mark-commission-paid';
import { isSupabaseConfigured } from '@/lib/supabase/server';

export const runtime = 'nodejs';

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  if (!(await isCommissionsAdminRequestAuthenticated(request))) {
    return NextResponse.json({ ok: false, error: 'Non autorisé' }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ ok: false, error: 'Supabase non configuré' }, { status: 503 });
  }

  const { id } = await context.params;
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Identifiant manquant' }, { status: 400 });
  }

  try {
    const updated = await markCommissionPaid(id);
    if (!updated) {
      return NextResponse.json(
        { ok: false, error: 'Commission introuvable ou déjà payée' },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[ADMIN:commissions] mark paid failed', { id, error });
    return NextResponse.json({ ok: false, error: 'Mise à jour impossible' }, { status: 500 });
  }
}
