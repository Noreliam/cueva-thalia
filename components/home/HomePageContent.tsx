import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
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
    { href: '/sejourner' as const, title: t('pathway1_title'), text: t('pathway1_text'), image: galleryPlaceholders[0].src },
    { href: '/evenements' as const, title: t('pathway2_title'), text: t('pathway2_text'), image: galleryPlaceholders[2].src },
    { href: '/workshops-retraites' as const, title: t('pathway3_title'), text: t('pathway3_text'), image: galleryPlaceholders[3].src },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <Image
            src="/photos/optimized/630dae8f-0713-4823-a054-72cb3135f3ac.jpg"
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="hero-bg-image"
          />
        </div>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-content fade-in">
          <span className="small-caps hero-label">Tenerife · San Miguel de Abona</span>
          <h1>Cueva Thalía</h1>
          <p className="hero-subtitle">{t('hero_subtitle')}</p>
          <p className="hero-lead">{t('hero_short')}</p>
          <div className="hero-ctas">
            <Link href="/sejourner" className="btn btn-primary">
              {t('hero_cta_primary')}
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary hero-whatsapp-cta"
            >
              {t('hero_cta_secondary')}
            </a>
          </div>
        </div>
        <span className="hero-badge">{t('hero_badge')}</span>
      </section>

      <section id="parcours" className="trois-facons">
        <div className="container">
          <h2 className="fade-in section-title-center">{t('pathways_title')}</h2>
          <div className="cards-grid">
            {pathways.map((pathway, index) => (
              <Link
                href={pathway.href}
                className="card fade-in card--link"
                key={pathway.href}
                style={index ? { transitionDelay: `${index * 100}ms` } : undefined}
              >
                <Image
                  src={pathway.image}
                  alt={pathway.title}
                  className="card-image organic-shape"
                  width={400}
                  height={300}
                  loading="lazy"
                />
                <h3>{pathway.title}</h3>
                <p>{pathway.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="experience">
        <div className="container experience-grid">
          <div className="experience-text fade-in">
            <h2>{t('story_title')}</h2>
            <p className="editorial-text">{t('story_p1')}</p>
            <p className="editorial-text" style={{ marginTop: 16 }}>
              {t('story_p2')}
            </p>
            <p className="editorial-text" style={{ marginTop: 16 }}>
              {t('story_p3')}
            </p>
          </div>
          <div className="experience-image-wrapper fade-in">
            <Image
              src="/photos/optimized/f4544e3e-af84-4a15-aed0-df1c535af9ee.jpg"
              alt={t('story_title')}
              className="organic-shape"
              width={800}
              height={700}
              loading="lazy"
              style={{ height: 700, width: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      <section className="avis">
        <div className="container">
          <h2 className="fade-in section-title-center">{t('reviews_title')}</h2>
          <p className="reviews-score fade-in">
            <span aria-hidden="true">★★★★★</span> {t('reviews_score')} ({t('reviews_count')})
          </p>
          <div className="avis-grid">
            {fullReviews.map((review, index) => (
              <div
                className="avis-card fade-in"
                key={review.author}
                style={index ? { transitionDelay: `${index * 100}ms` } : undefined}
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

      <section className="galerie home-galerie">
        <div className="container">
          <h2 className="fade-in section-title-center">{t('gallery_title')}</h2>
          <div className="home-gallery-grid">
            {galleryPlaceholders.map((item) => (
              <div className="home-gallery-item fade-in" key={item.alt}>
                <Image src={item.src} alt={item.alt} width={600} height={450} loading="lazy" className="organic-shape" />
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
        <div className="container cta-final-inner">
          <h2>{t('cta_title')}</h2>
          <p className="editorial-text">{t('cta_subtitle')}</p>
          <Link href="/sejourner" className="btn btn-brown">
            {t('cta_button')}
          </Link>
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link cta-final-whatsapp"
          >
            {t('cta_whatsapp')}
          </a>
        </div>
      </section>
    </>
  );
}
