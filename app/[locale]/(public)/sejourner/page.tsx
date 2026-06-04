import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import SmoobuBookingGate from '@/components/SmoobuBookingGate';

const SEJOURNER_HERO_IMAGE = '/photos/optimized/sejourner-hero.jpg';

const amenities = ['amenity_bed', 'amenity_sofa', 'amenity_kitchen', 'amenity_bath', 'amenity_garden'] as const;
const includedKeys = [
  'included_pool',
  'included_hydro',
  'included_garden',
  'included_bbq',
  'included_fire',
] as const;
const optionKeys = ['opt_romantic', 'opt_surprise', 'opt_massage', 'opt_late_checkout'] as const;
const faqKeys = ['1', '2', '3', '4'] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Sejourner' });
  return {
    title: `${t('hero_title')} — Cueva Thalía, Tenerife`,
    description: t('hero_subtitle'),
  };
}

export default async function SejournerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Sejourner' });
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34657077910';

  return (
    <div className="seo-page">
      <section className="gallery-hero page-full-hero page-full-hero--sejourner">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(28, 20, 12, 0.45), rgba(28, 20, 12, 0.58)), url('${SEJOURNER_HERO_IMAGE}')`,
          }}
        />
        <div className="gallery-hero-content page-full-hero-content page-full-hero-content--wide">
          <header className="page-full-hero-head">
            <span className="small-caps hero-label">Tenerife · San Miguel de Abona</span>
            <h1>{t('hero_title')}</h1>
            <p className="editorial-text page-hero-lead">{t('hero_subtitle')}</p>
            <a href="#reservation" className="btn btn-primary">
              {t('cta_check_availability')}
            </a>
          </header>

          <div className="page-full-hero-body">
            <div className="page-full-hero-intro">
              <p className="editorial-text">{t('seo_intro')}</p>
              <p className="editorial-text">{t('private_reminder')}</p>
            </div>

            <div className="page-full-hero-panel">
              <div className="page-full-hero-details">
                <div className="page-full-hero-block">
                  <h2>{t('amenities_title')}</h2>
                  <ul className="page-full-hero-amenities">
                    {amenities.map((key) => (
                      <li key={key}>{t(key)}</li>
                    ))}
                  </ul>
                </div>

                <div className="page-full-hero-block">
                  <h2>{t('included_title')}</h2>
                  <ul className="page-full-hero-included">
                    {includedKeys.map((key) => (
                      <li key={key}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        <span>{t(key)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="page-full-hero-block page-full-hero-block--options">
                <h2>{t('options_title')}</h2>
                <ul className="page-full-hero-options">
                  {optionKeys.map((key) => (
                    <li key={key}>{t(key)}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sejourner" id="reservation">
        <div className="container">
          <div className="booking-layout fade-in">
            <div className="tarifs-card">
              <h3>{t('capacity_title')}</h3>
              <p className="info-block-line">{t('capacity_standard')}</p>
              <p className="info-block-line">{t('capacity_group')}</p>
              <p className="info-block-line">{t('capacity_contact')}</p>

              <h3 style={{ marginTop: 40 }}>{t('rates_title')}</h3>
              <p className="info-block-line">{t('rate_line1')}</p>
              <p className="info-block-line">{t('rate_line2')}</p>
              <p className="info-block-line">{t('rate_line3')}</p>
              <p className="info-block-line">{t('rate_line4')}</p>
              <p className="small-caps info-block-meta">{t('checkin_checkout')}</p>
              <p className="info-block-meta">{t('deposit')}</p>

              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ marginTop: 24, display: 'inline-block' }}
              >
                {t('cta_whatsapp_quote')}
              </a>
            </div>
            <div className="smoobu-placeholder">
              <SmoobuBookingGate
                copy={{
                  label: t('booking_guests'),
                  continue: t('booking_continue'),
                  groupTitle: t('booking_group_title'),
                  groupText: t('booking_group_text'),
                  whatsapp: t('booking_whatsapp'),
                  eventsLink: t('booking_events_link'),
                  calendarTitle: t('booking_calendar_title'),
                  calendarDesc: t('booking_calendar_desc'),
                  noscript: t('booking_noscript'),
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="seo-faq">
        <div className="container">
          <h2 className="section-title-center">{t('faq_title')}</h2>
          <dl className="seo-faq-list">
            {faqKeys.map((n) => (
              <div className="seo-faq-item" key={n}>
                <dt>{t(`faq_q${n}`)}</dt>
                <dd>{t(`faq_a${n}`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="avis">
        <div className="container">
          <h2 className="section-title-center">{t('avis_title')}</h2>
          <div className="avis-grid">
            {[
              { text: 'Les photos ne lui rendent vraiment pas justice.', author: 'Emma' },
              { text: 'Un endroit magique avec sa piscine incroyable.', author: 'Caroline' },
            ].map((r) => (
              <div className="avis-card fade-in visible" key={r.author}>
                <p className="avis-text">&ldquo;{r.text}&rdquo;</p>
                <p className="small-caps avis-author">{r.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-bottom-cta">
        <div className="container">
          <p className="editorial-text">{t('gallery_cta')}</p>
          <div className="seo-bottom-links">
            <Link href="/galerie/piscine" className="card-link">
              Piscine
            </Link>
            <Link href="/galerie/chambre" className="card-link">
              Chambre
            </Link>
            <Link href="/galerie/jardin" className="card-link">
              Jardin
            </Link>
          </div>
          <Link href="/" className="btn btn-secondary">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </section>
    </div>
  );
}
