import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { MediaFrame } from '@/components/ui/MediaFrame';
import { fullReviews } from '@/lib/home-reviews';

const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34657077910';

const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const galleryPlaceholders = [
  { src: '/photos/optimized/7ea5a8c2-b48b-4a12-b7be-034ca90b0d8e.jpg', alt: 'Séjour' },
  { src: '/photos/optimized/4c8be500-7d15-4958-a5df-94e614ff3556.jpg', alt: 'Piscine' },
  { src: '/photos/optimized/9eac7702-d91d-45eb-9a8b-526186764f1f.jpg', alt: 'Événements' },
  { src: '/photos/optimized/49b90bf0-ce3f-4a3e-8164-90993ce96cd7.jpg', alt: 'Retraites' },
  { src: '/photos/optimized/046743a6-df86-4387-a7bf-b57f830e12c8.jpg', alt: 'Couchages' },
  { src: '/photos/optimized/galleries/jardin/photocouverture3.jpg', alt: 'Extérieurs' },
] as const;

export async function HomePageContent({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Home' });
  const loc = locale as 'fr' | 'es' | 'en';

  const pathways = [
    {
      href: '/sejourner' as const,
      title: t('pathway1_title'),
      text: t('pathway1_text'),
      badge: t('pathway1_badge'),
      cta: t('pathway1_cta'),
      image: galleryPlaceholders[0].src,
    },
    {
      href: '/evenements' as const,
      title: t('pathway2_title'),
      text: t('pathway2_text'),
      badge: t('pathway2_badge'),
      cta: t('pathway2_cta'),
      image: galleryPlaceholders[2].src,
    },
    {
      href: '/workshops-retraites' as const,
      title: t('pathway3_title'),
      text: t('pathway3_text'),
      badge: t('pathway3_badge'),
      cta: t('pathway3_cta'),
      image: galleryPlaceholders[3].src,
    },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <Image
            src="/photos/optimized/4c8be500-7d15-4958-a5df-94e614ff3556.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="hero-bg-image"
          />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content">
          <span className="small-caps hero-label">Tenerife · San Miguel de Abona</span>
          <h1>Cueva Thalía</h1>
          <p className="hero-tagline">{t('hero_tagline')}</p>
          <p className="hero-lead">{t('hero_lead')}</p>
          <div className="hero-ctas">
            <Link href="/sejourner" className="btn btn-primary">
              {t('hero_cta_primary')}
            </Link>
            <a href="#parcours" className="link-subtle hero-secondary-cta">
              {t('hero_cta_secondary')}
            </a>
          </div>
        </div>
        <div className="scroll-indicator" aria-hidden="true">
          <span className="small-caps">Scroll</span>
          <svg viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </section>

      <section id="parcours" className="trois-facons">
        <div className="container">
          <h2 className="section-title-center">{t('pathways_title')}</h2>
          <div className="cards-grid">
            {pathways.map((pathway) => (
              <Link
                href={pathway.href}
                className="card card--link"
                key={pathway.href}
              >
                <MediaFrame
                  src={pathway.image}
                  alt={pathway.title}
                  className="card-image"
                  aspectRatio="4 / 3"
                  sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                />
                <h3>{pathway.title}</h3>
                <p>{pathway.text}</p>
                <span className="card-badge">{pathway.badge}</span>
                <span className="card-link card-cta">{pathway.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="experience">
        <div className="container experience-grid">
          <div className="experience-text">
            <h2>{t('story_title')}</h2>
            <p className="editorial-text">{t('story_p1')}</p>
            <p className="editorial-text" style={{ marginTop: 16 }}>
              {t('story_p2')}
            </p>
            <p className="editorial-text" style={{ marginTop: 16 }}>
              {t('story_p3')}
            </p>
          </div>
          <div className="experience-image-wrapper">
            <MediaFrame
              src="/photos/optimized/f4544e3e-af84-4a15-aed0-df1c535af9ee.jpg"
              alt={t('story_title')}
              aspectRatio="3 / 4"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
          </div>
        </div>
      </section>

      <section className="promesses">
        <div className="container">
          <div className="promesses-grid">
            {[
              { title: t('promise1_title'), text: t('promise1_text') },
              { title: t('promise2_title'), text: t('promise2_text') },
              { title: t('promise3_title'), text: t('promise3_text') },
            ].map((item) => (
              <div className="promesse-card" key={item.title}>
                <h3>{item.title}</h3>
                <p className="editorial-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="piscine">
        <div className="container piscine-grid">
          <div className="piscine-image-wrapper">
            <div className="organic-shape">
              <MediaFrame
                src="/photos/optimized/4c8be500-7d15-4958-a5df-94e614ff3556.jpg"
                alt={t('pool_title')}
                aspectRatio="4 / 3"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>
          </div>
          <div className="piscine-content">
            <h2>{t('pool_title')}</h2>
            <p className="editorial-text">{t('pool_text')}</p>
            <div className="piscine-features">
              {[t('pool_feat1'), t('pool_feat2'), t('pool_feat3'), t('pool_feat4')].map((label) => (
                <div className="feature-item" key={label}>
                  <svg className="feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="avis">
        <div className="container">
          <h2 className="section-title-center">{t('reviews_title')}</h2>
          <p className="reviews-score">
            <span aria-hidden="true">★★★★★</span> {t('reviews_score')} ({t('reviews_count')})
          </p>
          <div className="avis-grid">
            {fullReviews.map((review) => (
              <div
                className="avis-card"
                key={review.author}
              >
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <p className="avis-text">&ldquo;{review.text[loc] ?? review.text.fr}&rdquo;</p>
                <p className="small-caps avis-author">{review.author}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 40 }}>
            <a href="#" className="card-link">
              {t('reviews_link')}
            </a>
          </p>
        </div>
      </section>

      <section className="localisation home-localisation">
        <div className="container loc-layout">
          <div>
            <h2>{t('location_title')}</h2>
            <p className="editorial-text">{t('location_intro')}</p>
            <ul className="distances-list">
              {(['1', '2', '3', '4', '5', '6', '7'] as const).map((n) => (
                <li className="distance-item" key={n}>
                  <span>{t(`loc_${n}_place`)}</span>
                  <span className="small-caps">{t(`loc_${n}_time`)}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://maps.app.goo.gl/"
              target="_blank"
              rel="noopener noreferrer"
              className="card-link"
              style={{ display: 'inline-block', marginTop: 24 }}
            >
              {t('location_link')}
            </a>
          </div>
          <div className="map-stylisee" aria-hidden="true">
            <span className="map-stylisee-label">{t('location_map_label')}</span>
            <span className="marker" style={{ top: '45%', left: '52%' }} />
          </div>
        </div>
      </section>

      <section className="galerie home-galerie">
        <div className="container">
          <h2 className="section-title-center">{t('gallery_title')}</h2>
          <div className="home-gallery-grid">
            {galleryPlaceholders.map((item) => (
              <div className="home-gallery-item" key={item.alt}>
                <MediaFrame src={item.src} alt={item.alt} aspectRatio="4 / 3" />
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/galerie" className="card-link">
              {t('gallery_link')}
            </Link>
          </p>
        </div>
      </section>

      <section className="cta-final">
        <div className="cta-final-bg" aria-hidden="true">
          <Image
            src="/photos/optimized/7ea5a8c2-b48b-4a12-b7be-034ca90b0d8e.jpg"
            alt=""
            fill
            sizes="100vw"
            className="cta-final-bg-image"
          />
        </div>
        <div className="cta-final-overlay" aria-hidden="true" />
        <div className="container cta-final-inner">
          <h2>{t('cta_title')}</h2>
          <p className="cta-final-subtitle">{t('cta_subtitle')}</p>
          <div className="cta-final-actions">
            <Link href="/sejourner" className="btn btn-primary">
              {t('cta_button')}
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-subtle cta-final-whatsapp"
            >
              {t('cta_whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
