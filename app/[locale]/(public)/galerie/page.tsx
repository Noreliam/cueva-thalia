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
      <section className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(90, 56, 37, 0.32), rgba(90, 56, 37, 0.32)), url('/photos/optimized/630dae8f-0713-4823-a054-72cb3135f3ac.jpg')`,
          }}
        />
        <div className="gallery-hero-content">
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
