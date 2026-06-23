import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link, routing } from '@/i18n/routing';
import { getGuideBySlug, guidePages } from '@/lib/guides-data';
import { buildPageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    guidePages.map((guide) => ({ locale, slug: guide.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  const loc = locale as 'es' | 'fr' | 'en';
  return buildPageMetadata({
    locale,
    path: `/guides/${slug}`,
    title: guide.titles[loc],
    description: guide.descriptions[loc],
    robots: { index: false, follow: false },
  });
}

export default async function GuidePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const loc = locale as 'es' | 'fr' | 'en';
  const t = await getTranslations({ locale, namespace: 'Guides' });
  const commonT = await getTranslations({ locale, namespace: 'Common' });
  const canonical = `https://cueva-thalia.com${locale === 'es' ? '' : `/${locale}`}/guides/${slug}`;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.h1[loc],
    author: { '@type': 'Organization', name: 'Cueva Thalía' },
    publisher: { '@type': 'Organization', name: 'Cueva Thalía', url: 'https://cueva-thalia.com' },
    url: canonical,
    mainEntityOfPage: canonical,
  };

  return (
    <div className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <article className="seo-page-content">
        <h1>{guide.h1[loc]}</h1>
        <p className="editorial-text">{commonT('guide_placeholder')}</p>
        <p className="editorial-text" style={{ marginTop: 24 }}>
          {guide.descriptions[loc]}
        </p>
        {guide.keywords?.[loc]?.length ? (
          <p className="small-caps" style={{ marginTop: 32 }}>
            {guide.keywords[loc].join(' · ')}
          </p>
        ) : null}
        <div className="seo-guide-links" style={{ marginTop: 48 }}>
          <Link href="/sejourner" className="card-link">
            {t('link_sejourner')}
          </Link>
          <Link href="/galerie" className="card-link">
            {t('link_galerie')}
          </Link>
        </div>
        <div className="tarifs-card" style={{ marginTop: 64 }}>
          <p className="editorial-text">{t('cta_box')}</p>
          <Link href="/sejourner" className="btn btn-primary" style={{ marginTop: 24 }}>
            {t('cta_button')}
          </Link>
        </div>
      </article>
    </div>
  );
}
