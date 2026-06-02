import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import ContactForm from '@/components/forms/ContactForm';
import { SiteClientEffects } from '@/components/site/SiteClientEffects';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return {
    title: `${t('title')} — Cueva Thalía Tenerife`,
    description: t('seo_intro'),
  };
}

const distances = [
  ['Aéroport Tenerife Sud', '15-20 min'],
  ['El Médano', '15 min'],
  ['Los Cristianos', '20 min'],
  ['Playa de Las Américas', '20-25 min'],
  ['Teide', '45 min - 1h'],
];

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34657077910';

  return (
    <div className="seo-page">
      <SiteClientEffects />

      <section className="gallery-hero" style={{ minHeight: '45vh' }}>
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('/photos/optimized/f4544e3e-af84-4a15-aed0-df1c535af9ee.jpg')`,
          }}
        />
        <div className="gallery-hero-content">
          <h1>{t('title')}</h1>
          <p className="editorial-text" style={{ maxWidth: 600, margin: '0 auto' }}>{t('subtitle')}</p>
        </div>
      </section>

      <section className="contact">
        <div className="container">
          <p className="editorial-text lettrine fade-in visible" style={{ maxWidth: 720, margin: '0 auto 48px', textAlign: 'center' }}>
            {t('seo_intro')}
          </p>

          <div className="seo-reassurance fade-in visible">
            <h3>{t('response_title')}</h3>
            <p className="editorial-text" style={{ marginTop: 12 }}>{t('response_desc')}</p>
          </div>

          <div className="event-layout" style={{ alignItems: 'start', marginTop: 64 }}>
            <div>
              <div className="contact-methods" style={{ gridTemplateColumns: '1fr' }}>
                <div className="contact-card fade-in visible">
                  <h3>WhatsApp</h3>
                  <p>+{whatsapp}</p>
                  <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    Écrivez-nous
                  </a>
                </div>
                <div className="contact-card fade-in visible">
                  <h3>Email</h3>
                  <p>contact@cueva-thalia.com</p>
                  <a href="mailto:contact@cueva-thalia.com" className="btn btn-secondary">
                    Envoyer un email
                  </a>
                </div>
                <div className="contact-card fade-in visible">
                  <h3>{t('address_title')}</h3>
                  <p>
                    Calle Las Morales 70
                    <br />
                    38620 San Miguel de Abona
                    <br />
                    Tenerife, España
                  </p>
                  <Link href="/sejourner" className="btn btn-primary" style={{ marginTop: 16 }}>
                    {t('booking_cta')}
                  </Link>
                </div>
              </div>

              <div style={{ marginTop: 48 }}>
                <h3>{t('location_title')}</h3>
                <ul className="distances-list" style={{ marginTop: 24 }}>
                  {distances.map(([place, time]) => (
                    <li className="distance-item" key={place}>
                      <span>{place}</span>
                      <span className="small-caps">{time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="custom-form fade-in visible seo-form-wrap">
              <h2>{t('form_title')}</h2>
              <ContactForm />
            </div>
          </div>

          <p style={{ textAlign: 'center', marginTop: 64 }}>
            <Link href="/" className="btn btn-secondary">
              ← Retour à l&apos;accueil
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
