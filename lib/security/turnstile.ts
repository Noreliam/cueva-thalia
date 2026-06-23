type TurnstileResult = {
  success: boolean;
  'error-codes'?: string[];
};

export async function verifyTurnstileToken(token: string, ip: string): Promise<boolean> {
  if (process.env.NODE_ENV === 'development') {
    return true;
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error('[TURNSTILE] TURNSTILE_SECRET_KEY is missing in production — all form submissions will fail');
    return false;
  }

  if (!token) {
    return false;
  }

  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: ip,
  });

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as TurnstileResult;
  return result.success === true;
}
