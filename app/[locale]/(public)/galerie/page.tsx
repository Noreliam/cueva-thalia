import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { GalleryWithFilters } from '@/components/gallery/GalleryWithFilters';
import { galleryUsageFilters } from '@/lib/gallery-data';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Galerie' });
  return {
    title: `${t('title')} | Cueva Thalía`,
    description: t('intro'),
  };
}

export default async function GaleriePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Galerie' });

  const filters = galleryUsageFilters.map((id) => ({
    id,
    label: t(`filter_${id}` as 'filter_sejour'),
  }));

  return (
    <div className="seo-page">
      <section className="gallery-hero gallery-hero--compact">
        <div className="gallery-hero-bg" style={{ background: 'var(--ct-sable)' }} />
        <div className="gallery-hero-content gallery-hero-content--light">
          <h1>{t('title')}</h1>
          <p className="editorial-text page-hero-lead">{t('intro')}</p>
          <Link href="/" className="btn btn-outline">
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>

      <section className="galerie">
        <div className="container">
          <GalleryWithFilters filters={filters} allLabel={t('filter_all')} />
        </div>
      </section>
    </div>
  );
}
