import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { getGalleryBySlug, galleryCategories, galleryImagePath } from '@/lib/gallery-data';
import { Lightbox } from '@/components/site/Lightbox';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const galleryAspectRatios = ['4 / 3', '3 / 4', '16 / 10', '1 / 1', '4 / 3', '3 / 4'] as const;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    galleryCategories.map((gallery) => ({ locale, slug: gallery.slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const gallery = getGalleryBySlug(slug);
  if (!gallery) return { title: 'Cueva Thalía' };
  const t = await getTranslations({ locale, namespace: 'Galerie' });
  const categoryTitle = t(`category_${slug}` as 'category_sejour');
  return {
    title: `${categoryTitle} | ${t('meta_title_suffix')}`,
    description: t('meta_description', { category: categoryTitle }),
  };
}

export default async function GalleryCategoryPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const gallery = getGalleryBySlug(slug);
  if (!gallery) notFound();

  const t = await getTranslations({ locale, namespace: 'Galerie' });
  const categoryTitle = t(`category_${slug}` as 'category_sejour');
  const coverSrc = galleryImagePath(gallery.folder, gallery.cover);

  return (
    <div className="seo-page">
      <section className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${coverSrc}')`,
          }}
        />
        <div className="gallery-hero-content">
          <h1>{categoryTitle}</h1>
          <Link href="/galerie" className="btn btn-outline">
            {t('back_to_gallery')}
          </Link>
        </div>
      </section>

      <section className="galerie gallery-subpage">
        <div className="container">
          <div className="gallery-grid">
            {gallery.images.map((image, index) => {
              const src = galleryImagePath(gallery.folder, image.filename);
              const aspectRatio = galleryAspectRatios[index % galleryAspectRatios.length];
              const caption = image.captionKey ? t(image.captionKey) : undefined;
              return (
                <figure className="gallery-item" data-src={src} data-caption={caption} key={image.filename}>
                  <MediaFrame
                    src={src}
                    alt={caption ?? categoryTitle}
                    aspectRatio={aspectRatio}
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                  {caption ? <figcaption className="gallery-item-caption">{caption}</figcaption> : null}
                </figure>
              );
            })}
          </div>
        </div>
      </section>
      <Lightbox />
    </div>
  );
}
