import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import WorkshopForm from '@/components/forms/WorkshopForm';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Workshops' });
  return {
    title: `${t('title')} — Retraites & ateliers Tenerife | Cueva Thalía`,
    description: t('seo_intro'),
  };
}

const workshopTags = [
  'Yoga',
  'Méditation',
  'Breathwork',
  'Sonothérapie',
  'Coaching',
  'Ateliers créatifs',
  'Soins bien-être',
  'Cercles de parole',
];

export default async function WorkshopsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Workshops' });

  return (
    <div className="seo-page">
      <section className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/photos/optimized/046743a6-df86-4387-a7bf-b57f830e12c8.jpg')`,
          }}
        />
        <div className="gallery-hero-content">
          <span className="small-caps hero-label">Retraites & transmission</span>
          <h1>{t('hero_title')}</h1>
          <p className="editorial-text" style={{ maxWidth: 640, margin: '0 auto 28px' }}>{t('hero_subtitle')}</p>
          <a href="#formulaire" className="btn btn-primary">{t('form_title')}</a>
        </div>
      </section>

      <section className="workshops">
        <div className="container event-layout">
          <div className="fade-in">
            <p className="editorial-text lettrine">{t('seo_intro')}</p>
            <h2 style={{ marginTop: 48 }}>{t('formats_title')}</h2>
            <div className="tags-container" style={{ marginTop: 24 }}>
              {workshopTags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
            <h2 style={{ marginTop: 48 }}>{t('process_title')}</h2>
            <div className="seo-process-steps">
              <div className="seo-process-step">
                <strong>{t('process_1_title')}</strong>
                <p>{t('process_1_desc')}</p>
              </div>
              <div className="seo-process-step">
                <strong>{t('process_2_title')}</strong>
                <p>{t('process_2_desc')}</p>
              </div>
              <div className="seo-process-step">
                <strong>{t('process_3_title')}</strong>
                <p>{t('process_3_desc')}</p>
              </div>
            </div>
            <div style={{ marginTop: 40 }}>
              <Image
                src="/photos/optimized/49b90bf0-ce3f-4a3e-8164-90993ce96cd7.jpg"
                alt="Atelier dans la cueva"
                width={800}
                height={400}
                className="organic-shape"
                style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }}
              />
            </div>
          </div>

          <div id="formulaire" className="seo-form-wrap">
            <h2>{t('form_title')}</h2>
            <div className="custom-form">
              <WorkshopForm />
            </div>
          </div>
        </div>
      </section>

      <section className="contact" style={{ paddingBottom: 120 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link href="/galerie/interieur" className="card-link">L&apos;intérieur →</Link>
          <Link href="/" className="btn btn-secondary" style={{ marginTop: 32, display: 'inline-block' }}>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
