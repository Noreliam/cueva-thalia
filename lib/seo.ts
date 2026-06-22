import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://cueva-thalia.com').replace(/\/$/, '');

/** Image used in WhatsApp, iMessage, Facebook, etc. (must be a public absolute URL). */
export const SITE_OG_IMAGE_PATH = '/photos/optimized/og-share.jpg';

const OG_LOCALE: Record<string, string> = {
  es: 'es_ES',
  fr: 'fr_FR',
  en: 'en_US',
};

function siteOgImage(alt: string) {
  const url = `${SITE_URL}${SITE_OG_IMAGE_PATH}`;
  return [{ url, width: 1200, height: 630, alt }];
}

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

const GOOGLE_SITE_VERIFICATION_FALLBACK = 'Y-Di3KWzGB-kj_Ci3y07ha21NEtC9czM5JKImHwi-2Q';

function normalizeGoogleSiteVerification(raw?: string): string {
  const value = raw?.trim();
  if (!value) return GOOGLE_SITE_VERIFICATION_FALLBACK;

  const fromMetaTag = value.match(/content=["']([^"']+)["']/i)?.[1]?.trim();
  if (fromMetaTag) return fromMetaTag;

  if (!value.includes('<')) return value;

  return GOOGLE_SITE_VERIFICATION_FALLBACK;
}

const GOOGLE_SITE_VERIFICATION = normalizeGoogleSiteVerification(
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
);

export function siteVerificationMetadata(): Pick<Metadata, 'verification'> {
  return { verification: { google: GOOGLE_SITE_VERIFICATION } };
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
  const ogAlt = title.split('|')[0]?.trim() || 'Cueva Thalía';
  const images = siteOgImage(ogAlt);
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    robots,
    ...siteVerificationMetadata(),
    alternates: hreflangAlternates(path, locale),
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Cueva Thalía',
      locale: OG_LOCALE[locale] ?? OG_LOCALE.es,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map((img) => img.url),
    },
    other: {
      'geo.region': 'ES-TF',
    },
  };
}

export { SITE_URL };
