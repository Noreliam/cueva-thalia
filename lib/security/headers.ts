import type { NextResponse } from 'next/server';

const CSP_BASE = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: blob: https:",
  "media-src 'self' blob:",
  "connect-src 'self' https://challenges.cloudflare.com https://*.supabase.co",
  "frame-src 'self' https://challenges.cloudflare.com https://login.smoobu.com https://*.smoobu.com",
];

/** En local (HTTP), upgrade-insecure-requests et HSTS cassent le CSS dans Safari. */
export function getSecurityHeaders(): Record<string, string> {
  const isDev = process.env.NODE_ENV === 'development';
  const csp = [...CSP_BASE, ...(isDev ? [] : ['upgrade-insecure-requests'])].join('; ');

  const headers: Record<string, string> = {
    'X-Frame-Options': 'SAMEORIGIN',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(self)',
    'Content-Security-Policy': csp,
    'X-DNS-Prefetch-Control': 'on',
  };

  if (!isDev) {
    headers['Strict-Transport-Security'] = 'max-age=63072000; includeSubDomains; preload';
  }

  return headers;
}

/** @deprecated Utiliser getSecurityHeaders() — conservé pour compatibilité build */
export const SECURITY_HEADERS = getSecurityHeaders();

export function applySecurityHeaders(response: NextResponse) {
  for (const [key, value] of Object.entries(getSecurityHeaders())) {
    response.headers.set(key, value);
  }
  response.headers.delete('x-powered-by');
  return response;
}
