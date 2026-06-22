import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { applySecurityHeaders } from '@/lib/security/headers';

const intlMiddleware = createMiddleware(routing);

/** /fr/favicon.svg renvoyait une page HTML 404 → erreur XML dans le navigateur */
const LOCALE_STATIC_ASSET =
  /^\/(es|fr|en)\/(favicon\.ico|favicon\.svg|apple-touch-icon\.png|brand\/favicon-64\.png)$/;

const BLOCKED_PATHS = [
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/wp-admin/i,
  /^\/wp-login/i,
  /^\/phpmyadmin/i,
  /^\/\.well-known\/(?!security\.txt)/i,
];

const GOOGLE_VERIFICATION = /^\/google[a-z0-9]+\.html$/;

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BLOCKED_PATHS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
  }

  const googleVerification = pathname.match(GOOGLE_VERIFICATION);
  if (googleVerification) {
    const filename = pathname.slice(1);
    return applySecurityHeaders(
      new NextResponse(`google-site-verification: ${filename}\n`, {
        status: 200,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      })
    );
  }

  const localeAsset = pathname.match(LOCALE_STATIC_ASSET);
  if (localeAsset) {
    const url = request.nextUrl.clone();
    url.pathname = `/${localeAsset[2]}`;
    return applySecurityHeaders(NextResponse.rewrite(url));
  }

  if (
    pathname === '/favicon.ico' ||
    pathname === '/favicon.svg' ||
    pathname === '/apple-touch-icon.png' ||
    pathname === '/brand/favicon-64.png'
  ) {
    return applySecurityHeaders(NextResponse.next());
  }

  if (pathname.startsWith('/dashboard')) {
    return applySecurityHeaders(NextResponse.next());
  }

  if (
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    pathname.startsWith('/videos/')
  ) {
    const response = NextResponse.next();
    return applySecurityHeaders(response);
  }

  if (pathname.startsWith('/api/')) {
    const response = NextResponse.next();
    return applySecurityHeaders(response);
  }

  const response = intlMiddleware(request);
  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    '/',
    '/(es|fr|en)/:path*',
    '/api/:path*',
    '/dashboard/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|mp4|webm|mov)$).*)',
  ],
};
