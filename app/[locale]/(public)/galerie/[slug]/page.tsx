import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getGalleryBySlug, galleryCategories, galleryImagePath } from '@/lib/gallery-data';
import { Lightbox } from '@/components/site/Lightbox';
import { SiteClientEffects } from '@/components/site/SiteClientEffects';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  return galleryCategories.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);
  if (!gallery) return { title: 'Galerie | Cueva Thalía' };
  return {
    title: `${gallery.title} | Galerie Cueva Thalía`,
    description: `Découvrez ${gallery.title} de Cueva Thalía, maison troglodyte privée à Tenerife.`,
  };
}

export default async function GalleryCategoryPage({ params }: Props) {
  const { slug } = await params;
  const gallery = getGalleryBySlug(slug);
  if (!gallery) notFound();

  const coverSrc = galleryImagePath(gallery.folder, gallery.cover);

  return (
    <div className="seo-page">
      <SiteClientEffects />
      <section className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${coverSrc}')`,
          }}
        />
        <div className="gallery-hero-content">
          <h1>{gallery.title}</h1>
          <Link href="/#galerie" className="btn btn-outline">
            Retour à la galerie
          </Link>
        </div>
      </section>

      <section className="galerie gallery-subpage">
        <div className="container">
          <div className="gallery-grid">
            {gallery.images.map((filename, index) => {
              const src = galleryImagePath(gallery.folder, filename);
              const heights = ['300px', '450px', '280px', '350px', '400px', '320px'];
              const h = heights[index % heights.length];
              return (
                <div className="gallery-item" data-src={src} key={filename}>
                  <div className="gallery-item-image" style={{ ['--h' as string]: h } as React.CSSProperties}>
                    <Image src={src} alt={gallery.title} width={600} height={450} loading="lazy" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Lightbox />
    </div>
  );
}
