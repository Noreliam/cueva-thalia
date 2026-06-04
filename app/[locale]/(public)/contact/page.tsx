import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import ContactForm from '@/components/forms/ContactForm';
import { BackHomeLink } from '@/components/layout/BackHomeLink';
import '@/components/contact/contact.css';

const CONTACT_HERO_IMAGE = '/photos/optimized/contact-hero.jpg';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  return {
    title: `${t('title')} — Cueva Thalía Tenerife`,
    description: t('seo_intro'),
  };
}

const contactDistanceKeys = ['1', '2', '4', '6'] as const;

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Contact' });
  const homeT = await getTranslations({ locale, namespace: 'Home' });
  const distances = [
    ...contactDistanceKeys.map((n) => [homeT(`loc_${n}_place`), homeT(`loc_${n}_time`)] as const),
    [t('loc_teide_place'), t('loc_teide_time')] as const,
  ];
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34657077910';

  return (
    <div className="seo-page">
      <section className="gallery-hero page-full-hero page-full-hero--contact">
        <div
          className="gallery-hero-bg"
          style={{ backgroundImage: `url('${CONTACT_HERO_IMAGE}')` }}
        />
        <div className="contact-hero-scrim" aria-hidden="true" />
        <div className="gallery-hero-content page-full-hero-content page-full-hero-content--contact">
          <header className="page-full-hero-head">
            <h1>{t('title')}</h1>
            <p className="editorial-text page-hero-lead">{t('subtitle')}</p>
            <a href="#formulaire" className="btn btn-primary">
              {t('form_title')}
            </a>
          </header>

          <div className="page-full-hero-body contact-hero-body">
            <div className="contact-hero-columns">
            <div className="page-full-hero-panel contact-hero-panel contact-hero-panel--coord">
              <p className="editorial-text">{t('seo_intro')}</p>

              <div className="contact-hero-channels">
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-hero-channel"
                >
                  <span className="small-caps">WhatsApp</span>
                  <span>+{whatsapp}</span>
                </a>
                <a href="mailto:contact@cueva-thalia.com" className="contact-hero-channel">
                  <span className="small-caps">Email</span>
                  <span>contact@cueva-thalia.com</span>
                </a>
                <div className="contact-hero-channel contact-hero-channel--static">
                  <span className="small-caps">{t('address_title')}</span>
                  <span>Calle Las Morales 70 · San Miguel de Abona</span>
                </div>
              </div>

              <p className="info-block-line contact-hero-response">{t('response_desc')}</p>
            </div>

            <div className="page-full-hero-panel contact-hero-panel contact-hero-panel--route">
              <h3>{t('location_title')}</h3>
              <ul className="contact-hero-distances">
                {distances.map(([place, time]) => (
                  <li key={place}>
                    <span>{place}</span>
                    <span className="small-caps">{time}</span>
                  </li>
                ))}
              </ul>
              <Link href="/sejourner" className="btn btn-secondary">
                {t('booking_cta')}
              </Link>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-form-section" id="formulaire">
        <div className="container">
          <div className="page-form-header">
            <h2>{t('form_title')}</h2>
          </div>
          <div className="custom-form fade-in visible">
            <ContactForm />
          </div>
          <p className="contact-back">
            <BackHomeLink locale={locale} />
          </p>
        </div>
      </section>
    </div>
  );
}
