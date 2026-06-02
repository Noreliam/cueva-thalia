import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { getGuideBySlug, guidePages } from '@/lib/guides-data';
import { buildPageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return guidePages.map((guide) => ({ slug: guide.slug }));
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
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const loc = locale as 'es' | 'fr' | 'en';
  const t = await getTranslations({ locale, namespace: 'Guides' });
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
      <article className="container" style={{ maxWidth: 720, paddingTop: 120, paddingBottom: 120 }}>
        <h1>{guide.h1[loc]}</h1>
        <p className="editorial-text">[À RÉDIGER — contenu placeholder en attente de rédaction par Manon]</p>
        <p className="editorial-text" style={{ marginTop: 24 }}>
          {guide.descriptions[loc]}
        </p>
        {guide.keywords?.length ? (
          <p className="small-caps" style={{ marginTop: 32 }}>
            {guide.keywords.join(' · ')}
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
