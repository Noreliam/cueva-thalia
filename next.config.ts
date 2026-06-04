import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { getSecurityHeaders } from '@/lib/security/headers';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: Object.entries(getSecurityHeaders()).map(([key, value]) => ({ key, value })),
      },
    ];
  },
};

export default withNextIntl(nextConfig);
