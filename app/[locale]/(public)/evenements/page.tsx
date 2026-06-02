import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { MediaFrame } from '@/components/ui/MediaFrame';
import EventForm from '@/components/forms/EventForm';
import { buildPageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const titles = {
    es: 'Eventos Privados en Cueva Thalía | Cumpleaños, Bodas Íntimas, Tenerife',
    fr: 'Événements Privés à Cueva Thalía | Anniversaires, Petits Mariages, Tenerife',
    en: 'Private Events at Cueva Thalía | Birthdays, Intimate Weddings, Tenerife',
  };
  const descriptions = {
    es: 'Privatiza Cueva Thalía para tu evento: cumpleaños, shooting, boda íntima o celebración privada. Presupuesto personalizado.',
    fr: 'Privatisez Cueva Thalía pour un anniversaire, un shooting, un petit mariage ou une célébration intime. Devis personnalisé.',
    en: 'Hire Cueva Thalía for a birthday, photo shoot, small wedding or private celebration. Personalised quote.',
  };
  const loc = locale as 'es' | 'fr' | 'en';
  return buildPageMetadata({
    locale,
    path: '/evenements',
    title: titles[loc],
    description: descriptions[loc],
  });
}

export default async function EvenementsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Evenements' });
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34657077910';

  return (
    <div className="seo-page">
      <section className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(90, 56, 37, 0.35), rgba(90, 56, 37, 0.35)), url('/photos/optimized/9eac7702-d91d-45eb-9a8b-526186764f1f.jpg')`,
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

      <section className="evenements">
        <div className="container event-layout">
          <div className="fade-in">
            <p className="editorial-text">{t('body_text')}</p>

            <h2 style={{ marginTop: 48 }}>{t('usages_title')}</h2>
            <div className="tags-container" style={{ marginTop: 24 }}>
              {[t('usage_1'), t('usage_2'), t('usage_3'), t('usage_4')].map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>

            <div className="editorial-image">
              <MediaFrame
                src="/photos/optimized/galleries/jardin/photocouverture3.jpg"
                alt="Espace événement Cueva Thalía"
                aspectRatio="16 / 10"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

            <div className="info-highlight-box info-highlight-box--secondary">
              <h3>{t('groups_title')}</h3>
              <p className="info-block-line">{t('groups_line1')}</p>
              <p className="info-block-line">{t('groups_line2')}</p>
              <p className="info-block-line">{t('groups_line3')}</p>
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

          <div id="formulaire" className="seo-form-wrap">
            <h2>{t('form_title')}</h2>
            <p className="small-caps" style={{ marginBottom: 24, color: 'var(--ct-terracotta)' }}>
              {t('form_disclaimer')}
            </p>
            <div className="custom-form">
              <EventForm />
            </div>
          </div>
        </div>
      </section>

      <section className="contact" style={{ paddingBottom: 120 }}>
        <div className="container page-bottom-cta">
          <Link href="/galerie/jardin" className="card-link">
            Voir le jardin →
          </Link>
          <Link href="/" className="btn btn-secondary" style={{ marginTop: 32, display: 'inline-block' }}>
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
