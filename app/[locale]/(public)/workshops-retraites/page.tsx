import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import WorkshopForm from '@/components/forms/WorkshopForm';
import { BackHomeLink } from '@/components/layout/BackHomeLink';

const WORKSHOPS_HERO_IMAGE = '/photos/optimized/workshops-retraites-hero.jpg';

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
      <section className="gallery-hero page-full-hero page-full-hero--workshops">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(28, 14, 36, 0.52), rgba(28, 14, 36, 0.62)), url('${WORKSHOPS_HERO_IMAGE}')`,
          }}
        />
        <div className="gallery-hero-content page-full-hero-content">
          <h1>{t('hero_title')}</h1>
          <p className="editorial-text page-hero-lead">{t('hero_subtitle')}</p>
          <a href="#formulaire" className="btn btn-primary">
            {t('form_title')}
          </a>

          <div className="page-full-hero-body">
            <h2>{t('formats_title')}</h2>
            <div className="tags-container">
              {[t('format_1'), t('format_2'), t('format_3'), t('format_4')].map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="info-block-line info-block-line--muted">{t('formats_more')}</p>

            <div className="page-full-hero-meta">
              <p className="info-block-line">{t('capacity_text')}</p>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {t('cta_whatsapp')}
              </a>
            </div>
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
          <Link href="/galerie/atelier" className="card-link">
            {t('gallery_link_atelier')}
          </Link>
          <p style={{ marginTop: 24 }}>
            <BackHomeLink locale={locale} />
          </p>
        </div>
      </section>
    </div>
  );
}
