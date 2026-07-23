import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  COMMISSIONS_ADMIN_COOKIE,
  getCommissionsAdminPassword,
  getCommissionsAdminSessionToken,
} from '@/lib/admin/commissions-auth';

export const runtime = 'nodejs';

const bodySchema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const configuredPassword = getCommissionsAdminPassword();
  if (!configuredPassword) {
    return NextResponse.json(
      { ok: false, error: 'Accès admin non configuré (ADMIN_COMMISSIONS_PASSWORD).' },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Requête invalide' }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Mot de passe requis' }, { status: 400 });
  }

  if (parsed.data.password !== configuredPassword) {
    return NextResponse.json({ ok: false, error: 'Mot de passe incorrect' }, { status: 401 });
  }

  const token = getCommissionsAdminSessionToken();
  if (!token) {
    return NextResponse.json({ ok: false, error: 'Session indisponible' }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COMMISSIONS_ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
