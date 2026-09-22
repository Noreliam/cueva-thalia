import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { CancellationPolicySections } from '@/components/booking/CancellationPolicySections';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BookingSuccess' });
  return {
    title: `${t('title')} | Cueva Thalía`,
    robots: { index: false, follow: false },
  };
}

export default async function BookingMerciPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BookingSuccess' });
  const loc = locale as 'fr' | 'es' | 'en';

  return (
    <div className="seo-page">
      <div className="legal-content booking-success">
        <h1>{t('title')}</h1>
        <p className="lead">{t('lead')}</p>
        <p className="editorial-text">{t('note')}</p>

        <section className="booking-success-card">
          <h2>{t('hours_title')}</h2>
          <p className="editorial-text">{t('hours_text')}</p>
        </section>

        <section className="booking-success-card booking-success-card--deposit">
          <h2>{t('deposit_title')}</h2>
          <p className="editorial-text">{t('deposit_text')}</p>
          <p className="editorial-text">{t('deposit_pay')}</p>
        </section>

        <section className="booking-success-policy">
          <h2>{t('policy_title')}</h2>
          <p className="editorial-text">{t('policy_intro')}</p>
          <CancellationPolicySections locale={loc} headingAs="h3" hideIntro />
        </section>

        <p style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/sejourner" className="card-link">
            {t('back')}
          </Link>
        </p>
      </div>
    </div>
  );
}
