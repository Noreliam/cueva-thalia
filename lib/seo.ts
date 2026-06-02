import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://cueva-thalia.com').replace(/\/$/, '');

export function localizedPath(path: string, locale: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (locale === routing.defaultLocale) {
    return normalized === '/' ? '/' : normalized;
  }
  return normalized === '/' ? `/${locale}` : `/${locale}${normalized}`;
}

export function absoluteUrl(path: string, locale: string): string {
  return `${SITE_URL}${localizedPath(path, locale)}`;
}

export function hreflangAlternates(path: string, locale?: string): Metadata['alternates'] {
  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = absoluteUrl(path, loc);
  }
  languages['x-default'] = absoluteUrl(path, routing.defaultLocale);
  return {
    canonical: absoluteUrl(path, locale ?? routing.defaultLocale),
    languages,
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  robots,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
  robots?: Metadata['robots'];
}): Metadata {
  const url = absoluteUrl(path, locale);
  return {
    title,
    description,
    robots,
    alternates: hreflangAlternates(path, locale),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Cueva Thalía',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'geo.region': 'ES-TF',
    },
  };
}

export { SITE_URL };
