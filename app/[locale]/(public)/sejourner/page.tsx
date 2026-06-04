import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { SejournerBookingSection } from '@/components/booking/SejournerBookingSection';
import { BackHomeLink } from '@/components/layout/BackHomeLink';
import { fullReviews } from '@/lib/home-reviews';

const SEJOURNER_HERO_IMAGE = '/photos/optimized/sejourner-hero.jpg';

const amenities = ['amenity_bed', 'amenity_sofa', 'amenity_kitchen', 'amenity_bath', 'amenity_garden', 'amenity_wifi'] as const;
const includedKeys = [
  'included_pool',
  'included_hydro',
  'included_garden',
  'included_bbq',
  'included_fire',
  'included_linens',
  'included_wifi',
  'included_kitchen_basics',
  'included_tv',
] as const;
const optionKeys = ['opt_romantic', 'opt_surprise', 'opt_massage', 'opt_late_checkout'] as const;
const faqKeys = ['1', '2', '3', '4', '5', '6', '7'] as const;

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
  const g = await getTranslations({ locale, namespace: 'Galerie' });
  const c = await getTranslations({ locale, namespace: 'Common' });
  const loc = locale as 'fr' | 'es' | 'en';
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
            <span className="small-caps hero-label">{c('location_badge')}</span>
            <h1>{t('hero_title')}</h1>
            <p className="editorial-text page-hero-lead">{t('hero_subtitle')}</p>
            <a href="#reservation" className="btn btn-primary">
              {t('cta_check_availability')}
            </a>
          </header>

          <div className="page-full-hero-body">
            <div className="page-full-hero-panel">
              <div className="page-full-hero-panel-intro">
                <p className="editorial-text">{t('seo_intro')}</p>
                <p className="editorial-text">{t('private_reminder')}</p>
              </div>

              <div className="page-full-hero-details">
                <div className="page-full-hero-block">
                  <h2>{t('amenities_title')}</h2>
                  <ul className="page-full-hero-amenities">
                    {amenities.map((key) => (
                      <li key={key}>{t(key)}</li>
                    ))}
                  </ul>
                  <p className="editorial-text page-full-hero-amenities-note">{t('animals_note')}</p>
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
          <SejournerBookingSection
            copy={{
              reservationTitle: t('reservation_title'),
              reservationLead: t('reservation_lead'),
              capacityTitle: t('capacity_title'),
              capacityStandard: t('capacity_standard'),
              capacityDetailsSummary: t('capacity_details_summary'),
              capacityDetailsBody: t('capacity_details_body'),
              ratesTitle: t('rates_title'),
              rateWeekdayLabel: t('rate_weekday_label'),
              rateWeekendLabel: t('rate_weekend_label'),
              ratePerNight: t('rate_per_night'),
              ratesFootnote: t('rates_footnote'),
              checkinCheckout: t('checkin_checkout'),
              deposit: t('deposit'),
              ctaWhatsappQuote: t('cta_whatsapp_quote'),
              bookingGuests: t('booking_guests'),
              bookingContinue: t('booking_continue'),
              bookingGroupTitle: t('booking_group_title'),
              bookingGroupText: t('booking_group_text'),
              bookingWhatsapp: t('booking_whatsapp'),
              bookingEventsLink: t('booking_events_link'),
              bookingCalendarTitle: t('booking_calendar_title'),
              bookingCalendarDesc: t('booking_calendar_desc'),
              bookingNoscript: t('booking_noscript'),
              whatsappHref: `https://wa.me/${whatsapp}`,
            }}
          />
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
            {fullReviews.slice(0, 2).map((review) => (
              <div className="avis-card fade-in visible" key={review.author}>
                <p className="avis-text">&ldquo;{review.text[loc] ?? review.text.fr}&rdquo;</p>
                <p className="small-caps avis-author">{review.author}</p>
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
              {g('category_piscine')}
            </Link>
            <Link href="/galerie/chambre" className="card-link">
              {g('category_chambre')}
            </Link>
            <Link href="/galerie/jardin" className="card-link">
              {g('category_jardin')}
            </Link>
          </div>
          <BackHomeLink locale={locale} />
        </div>
      </section>
    </div>
  );
}
