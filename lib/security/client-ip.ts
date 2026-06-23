import { headers } from 'next/headers';

function resolveClientIp(
  cfConnectingIp: string | null,
  forwardedFor: string | null,
  realIp: string | null,
): string {
  const cfIp = cfConnectingIp?.trim();
  if (cfIp) {
    return cfIp;
  }

  const forwarded = forwardedFor?.split(',')[0]?.trim();
  if (forwarded) {
    return forwarded;
  }

  return realIp?.trim() || 'unknown';
}

export async function getClientIp(): Promise<string> {
  const headerList = await headers();
  return resolveClientIp(
    headerList.get('cf-connecting-ip'),
    headerList.get('x-forwarded-for'),
    headerList.get('x-real-ip'),
  );
}

export function getClientIpFromRequest(request: Request): string {
  return resolveClientIp(
    request.headers.get('cf-connecting-ip'),
    request.headers.get('x-forwarded-for'),
    request.headers.get('x-real-ip'),
  );
}
