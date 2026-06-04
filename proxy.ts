import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { applySecurityHeaders } from '@/lib/security/headers';

const intlMiddleware = createMiddleware(routing);

const BLOCKED_PATHS = [
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/wp-admin/i,
  /^\/wp-login/i,
  /^\/phpmyadmin/i,
  /^\/\.well-known\/(?!security\.txt)/i,
];

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (BLOCKED_PATHS.some((pattern) => pattern.test(pathname))) {
    return new NextResponse(null, { status: 404 });
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
