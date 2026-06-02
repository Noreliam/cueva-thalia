import { NextResponse } from 'next/server';
import type { z } from 'zod';
import { getClientIpFromRequest } from '@/lib/security/client-ip';
import { checkRateLimit } from '@/lib/security/rate-limit';
import { verifyTurnstileToken } from '@/lib/security/turnstile';

const MAX_BODY_BYTES = 16_384;

export const securityFieldsSchema = {
  _hp: undefined as string | undefined,
  turnstileToken: undefined as string | undefined,
};

type FormHandlerOptions<T extends z.ZodType> = {
  formType: string;
  schema: T;
  handler: (data: z.infer<T>) => Promise<void> | void;
};

function genericError(status: number) {
  return NextResponse.json({ ok: false, error: 'Request rejected' }, { status });
}

export async function handleFormSubmission<T extends z.ZodType>(
  request: Request,
  { formType, schema, handler }: FormHandlerOptions<T>,
) {
  const ip = getClientIpFromRequest(request);
  const rateLimit = checkRateLimit(`${formType}:${ip}`);

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

  try {
    const parsed = schema.parse(body);
    await handler(parsed);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(`[FORM:${formType}] validation error`);
    return genericError(400);
  }
}
