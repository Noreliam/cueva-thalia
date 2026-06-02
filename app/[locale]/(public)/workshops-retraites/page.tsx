import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { MediaFrame } from '@/components/ui/MediaFrame';
import WorkshopForm from '@/components/forms/WorkshopForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Workshops' });
  return {
    title: `${t('hero_title')} — Cueva Thalía, Tenerife`,
    description: t('hero_subtitle'),
  };
}

export default async function WorkshopsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Workshops' });
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34657077910';

  return (
    <div className="seo-page">
      <section className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(90, 56, 37, 0.35), rgba(90, 56, 37, 0.35)), url('/photos/optimized/046743a6-df86-4387-a7bf-b57f830e12c8.jpg')`,
          }}
        />
        <div className="gallery-hero-content">
          <h1>{t('hero_title')}</h1>
          <p className="editorial-text page-hero-lead">{t('hero_subtitle')}</p>
          <a href="#formulaire" className="btn btn-primary">
            {t('form_title')}
          </a>
        </div>
      </section>

      <section className="workshops">
        <div className="container page-body-inner fade-in">
          <h2>{t('formats_title')}</h2>
          <div className="tags-container">
            {[t('format_1'), t('format_2'), t('format_3'), t('format_4')].map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          <div className="editorial-image">
            <MediaFrame
              src="/photos/optimized/49b90bf0-ce3f-4a3e-8164-90993ce96cd7.jpg"
              alt="Retraite et atelier Cueva Thalía"
              aspectRatio="16 / 10"
              sizes="(min-width: 1024px) 720px, 100vw"
            />
          </div>

          <div className="info-highlight-box info-highlight-box--secondary">
            <p className="info-block-line">{t('capacity_text')}</p>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ marginTop: 20, display: 'inline-block' }}
            >
              {t('cta_whatsapp')}
            </a>
          </div>
        </div>
      </section>

      <section className="page-form-section" id="formulaire">
        <div className="container">
          <div className="page-form-header">
            <h2>{t('form_title')}</h2>
          </div>
          <div className="custom-form">
            <WorkshopForm />
          </div>
        </div>
      </section>

      <section className="page-bottom-cta">
        <div className="container">
          <Link href="/galerie/interieur" className="card-link">
            Voir l&apos;intérieur →
          </Link>
          <p style={{ marginTop: 24 }}>
            <Link href="/" className="btn btn-secondary">
              ← Retour à l&apos;accueil
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
