import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BonCadeau' });
  return {
    title: `${t('merci_title')} | Cueva Thalía`,
    robots: { index: false, follow: false },
  };
}

export default async function BonCadeauMerciPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { locale } = await params;
  const { session_id: sessionId } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'BonCadeau' });

  return (
    <div className="seo-page seo-page--bon-cadeau">
      <section className="section-padding">
        <div className="container" style={{ maxWidth: '36rem' }}>
          <h1 className="section-title">{t('merci_title')}</h1>
          <p className="lead">{t('merci_lead')}</p>
          <p className="small-caps" style={{ marginTop: '1.5rem' }}>
            {t('merci_note')}
          </p>
          {sessionId ? (
            <p className="visually-hidden" aria-hidden>
              {sessionId}
            </p>
          ) : null}
          <p style={{ marginTop: '2rem' }}>
            <Link href="/" className="card-link">
              {t('back_home')}
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
