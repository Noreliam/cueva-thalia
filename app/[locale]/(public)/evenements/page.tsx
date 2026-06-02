import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
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
    es: 'Privatiza Cueva Thalía para tu evento: cumpleaños íntimo, boda pequeña, velada privada, shooting fotográfico. Un lugar único en Tenerife. Presupuesto personalizado en 48h.',
    fr: 'Privatisez Cueva Thalía pour votre événement : anniversaire, mariage intimiste, shooting photo, soirée privée. Lieu unique à Tenerife. Devis personnalisé sous 48h.',
    en: 'Hire Cueva Thalía exclusively for your event: intimate birthday, small wedding, photo shoot, private dinner. Unique venue in Tenerife. Personalised quote within 48h.',
  };
  const loc = locale as 'es' | 'fr' | 'en';
  return buildPageMetadata({
    locale,
    path: '/evenements',
    title: titles[loc],
    description: descriptions[loc],
  });
}

const eventTags = [
  'Anniversaires',
  'Célébrations',
  'Shootings photo',
  'Petits mariages',
  'Privatisations',
  'Soirées intimistes',
  'Cérémonies',
];

export default async function EvenementsPrivesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Evenements' });
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34657077910';

  return (
    <div className="seo-page">
      <section className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/photos/optimized/9eac7702-d91d-45eb-9a8b-526186764f1f.jpg')`,
          }}
        />
        <div className="gallery-hero-content">
          <span className="small-caps hero-label">Événements sur demande</span>
          <h1>{t('hero_title')}</h1>
          <p className="editorial-text" style={{ maxWidth: 640, margin: '0 auto 28px' }}>{t('hero_subtitle')}</p>
          <a href="#formulaire" className="btn btn-primary">{t('form_title')}</a>
        </div>
      </section>

      <section className="evenements">
        <div className="container event-layout">
          <div className="fade-in">
            <p className="editorial-text lettrine">{t('seo_intro')}</p>
            <h2 style={{ marginTop: 48 }}>{t('usages_title')}</h2>
            <div className="tags-container" style={{ marginTop: 24 }}>
              {eventTags.map((tag) => (
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
                src="/photos/optimized/galleries/jardin/photocouverture3.jpg"
                alt="Jardin Cueva Thalía"
                width={800}
                height={400}
                className="organic-shape"
                style={{ width: '100%', maxHeight: 420, objectFit: 'cover' }}
              />
            </div>
            <div style={{ marginTop: 40, padding: 28, background: 'var(--ct-sable)', borderRadius: 4 }}>
              <h3>{t('constraints_title')}</h3>
              <p className="editorial-text" style={{ marginTop: 12 }}>{t('constraints_desc')}</p>
            </div>
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ marginTop: 32, display: 'inline-block' }}
            >
              {t('cta_whatsapp')}
            </a>
          </div>

          <div id="formulaire" className="seo-form-wrap">
            <h2>{t('form_title')}</h2>
            <p className="small-caps" style={{ marginBottom: 24, color: 'var(--ct-terracotta)' }}>{t('form_disclaimer')}</p>
            <div className="custom-form">
              <EventForm />
            </div>
          </div>
        </div>
      </section>

      <section className="contact" style={{ paddingBottom: 120 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link href="/galerie/jardin" className="card-link" style={{ marginRight: 24 }}>
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
