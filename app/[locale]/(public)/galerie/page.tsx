import { getTranslations } from 'next-intl/server';
import { GalleryWithFilters } from '@/components/gallery/GalleryWithFilters';
import { galleryCategories, galleryUsageFilters } from '@/lib/gallery-data';
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

  const categories = galleryCategories.map((cat) => ({
    slug: cat.slug,
    folder: cat.folder,
    usage: cat.usage,
    title: t(`category_${cat.slug}` as 'category_sejour'),
    images: cat.images.map((image) => ({
      filename: image.filename,
      caption: image.captionKey ? t(image.captionKey) : undefined,
    })),
  }));

  return (
    <div className="seo-page">
      <section className="gallery-hero gallery-hero--plain">
        <div className="gallery-hero-content gallery-hero-content--light page-full-hero-content">
          <header className="page-full-hero-head">
            <h1>{t('title')}</h1>
            <p className="editorial-text page-hero-lead">{t('intro')}</p>
          </header>
        </div>
      </section>

      <section className="galerie">
        <div className="container">
          <GalleryWithFilters filters={filters} allLabel={t('filter_all')} categories={categories} />
        </div>
      </section>
    </div>
  );
}
