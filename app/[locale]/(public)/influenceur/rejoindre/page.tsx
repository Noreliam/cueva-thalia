import { getTranslations } from 'next-intl/server';
import InfluenceurSignupForm from '@/components/influenceur/InfluenceurSignupForm';
import { INFLUENCEUR_COMMISSION_PERCENT, INFLUENCEUR_DISCOUNT_PERCENT } from '@/lib/influenceurs/constants';
import { buildPageMetadata } from '@/lib/seo';

const HERO_IMAGE = '/photos/optimized/home-galerie/02-piscine.jpg';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Influenceur' });

  return {
    ...buildPageMetadata({
      locale,
      path: '/influenceur/rejoindre',
      title: t('meta_title'),
      description: t('meta_description'),
      robots: { index: false, follow: false, noarchive: true },
    }),
  };
}

export default async function InfluenceurRejoindrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Influenceur' });

  return (
    <div className="seo-page">
      <section className="gallery-hero page-full-hero">
        <div className="gallery-hero-bg" style={{ backgroundImage: `url('${HERO_IMAGE}')` }} />
        <div className="gallery-hero-scrim" aria-hidden="true" />
        <div className="gallery-hero-content page-full-hero-content">
          <header className="page-full-hero-head">
            <p className="small-caps">{t('kicker')}</p>
            <h1>{t('title')}</h1>
            <p className="editorial-text page-hero-lead">{t('hero_lead')}</p>
          </header>
        </div>
      </section>

      <section className="page-form-section">
        <div className="container">
          <div className="page-form-header">
            <h2>{t('form_title')}</h2>
            <p className="editorial-text influenceur-intro">
              {t('intro', {
                guestDiscount: INFLUENCEUR_DISCOUNT_PERCENT,
                commissionPercent: INFLUENCEUR_COMMISSION_PERCENT,
              })}
            </p>
          </div>
          <div className="custom-form fade-in visible">
            <InfluenceurSignupForm locale={locale as 'fr' | 'es' | 'en'} />
          </div>
        </div>
      </section>
    </div>
  );
}
