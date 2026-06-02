import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { galleryCategories, galleryImagePath } from '@/lib/gallery-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galerie | Cueva Thalía',
  description: 'Explorez la cueva en images : intérieur, piscine chauffée, jardin, chambre, cuisine et détails.',
};

export default function GaleriePage() {
  return (
    <div className="seo-page">
      <section className="gallery-hero" style={{ minHeight: '50vh' }}>
        <div className="gallery-hero-bg" style={{ background: 'var(--ct-sable)' }} />
        <div className="gallery-hero-content" style={{ color: 'var(--ct-brun-chaud)' }}>
          <h1 style={{ color: 'var(--ct-brun-chaud)' }}>Galerie</h1>
          <p className="editorial-text" style={{ maxWidth: 600, margin: '0 auto 24px' }}>
            Six univers pour découvrir la cueva : l&apos;intérieur, la piscine, la chambre, le jardin, la cuisine et les
            détails qui font l&apos;atmosphère du lieu.
          </p>
          <Link href="/" className="btn btn-outline" style={{ borderColor: 'var(--ct-brun-chaud)', color: 'var(--ct-brun-chaud)' }}>
            Retour à l&apos;accueil
          </Link>
        </div>
      </section>

      <section className="galerie">
        <div className="container">
          <div className="gallery-grid">
            {galleryCategories.map((cat) => (
              <Link key={cat.slug} href={`/galerie/${cat.slug}`} className="gallery-preview-link">
                <div
                  className="gallery-preview-image"
                  style={{ ['--h' as string]: cat.previewHeight } as React.CSSProperties}
                >
                  <div className="gallery-preview-image__clip">
                    <Image
                      src={galleryImagePath(cat.folder, cat.cover)}
                      alt={cat.title}
                      width={600}
                      height={450}
                      loading="lazy"
                    />
                  </div>
                  <span className="gallery-label">{cat.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
