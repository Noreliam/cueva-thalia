import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendInfluenceurWelcomeEmail } from '@/lib/email/influenceur-welcome';
import { registerInfluenceur } from '@/lib/influenceurs/register';
import { getClientIpFromRequest } from '@/lib/security/client-ip';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { verifyTurnstileToken } from '@/lib/security/turnstile';
import { absoluteUrl } from '@/lib/seo';

const MAX_BODY_BYTES = 16_384;

const signupSchema = z.object({
  nom: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  instagram: z
    .union([z.string(), z.null()])
    .optional()
    .transform((val) => {
      const text = typeof val === 'string' ? val.trim() : '';
      return text || undefined;
    })
    .refine((val) => !val || val.length <= 64, 'Instagram handle too long'),
  locale: z.enum(['fr', 'es', 'en']).default('es'),
  turnstileToken: z.string().optional(),
  _hp: z.string().optional(),
});

function genericError(status: number) {
  return NextResponse.json({ ok: false, error: 'Request rejected' }, { status });
}

export async function POST(request: Request) {
  const ip = getClientIpFromRequest(request);
  const rateLimit = checkRateLimit(`influenceur-signup:${ip}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests' },
      {
        status: 429,
        headers: rateLimit.retryAfterSeconds
          ? { 'Retry-After': String(rateLimit.retryAfterSeconds) }
          : undefined,
      },
    );
  }

  const contentLength = Number(request.headers.get('content-length') || 0);
  if (contentLength > MAX_BODY_BYTES) {
    return genericError(413);
  }

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return genericError(413);
    }
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return genericError(400);
  }

  const record = body as Record<string, unknown>;

  if (typeof record._hp === 'string' && record._hp.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const turnstileToken = typeof record.turnstileToken === 'string' ? record.turnstileToken : '';
  const turnstileOk = await verifyTurnstileToken(turnstileToken, ip);
  if (!turnstileOk) {
    return genericError(403);
  }

  let parsed;
  try {
    parsed = signupSchema.parse(body);
  } catch {
    return genericError(400);
  }

  const trackingBase = absoluteUrl('/sejourner', parsed.locale);
  const result = await registerInfluenceur(
    {
      nom: parsed.nom,
      email: parsed.email,
      instagram: parsed.instagram,
    },
    trackingBase,
  );

  if (!result.ok) {
    const errorCode =
      result.error === 'supabase_unconfigured'
        ? 'unavailable'
        : result.error === 'tables_missing'
          ? 'tables_missing'
          : result.error === 'database_error'
            ? 'database_error'
            : 'registration_failed';
    const status =
      result.error === 'supabase_unconfigured' ||
      result.error === 'database_error' ||
      result.error === 'tables_missing'
        ? 503
        : 400;
    return NextResponse.json({ ok: false, errorCode }, { status });
  }

  if (!result.alreadyRegistered) {
    try {
      await sendInfluenceurWelcomeEmail(parsed.email, result.code, result.trackingUrl, parsed.locale);
    } catch (error) {
      console.error('[INFLUENCEUR:signup] welcome email failed', error);
    }
  }

  return NextResponse.json({
    ok: true,
    referralCode: result.code,
    trackingUrl: result.trackingUrl,
  });
}
