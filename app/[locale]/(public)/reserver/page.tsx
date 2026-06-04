import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { BackHomeLink } from '@/components/layout/BackHomeLink';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const navT = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: `${navT('reserver')} | Cueva Thalía` };
}

export default async function ReserverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const navT = await getTranslations({ locale, namespace: 'Navigation' });
  const t = await getTranslations({ locale, namespace: 'Reserver' });
  return (
    <div className="seo-page">
      <section className="page-intro">
        <div className="container">
          <h1>{navT('reserver')}</h1>
          <p className="editorial-text" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 32px' }}>
            {t('intro')}
          </p>
          <div className="contact-methods">
            <Link href="/sejourner" className="contact-card contact-card--light">
              <h3>{navT('sejourner')}</h3>
              <p>{t('sejourner_desc')}</p>
              <span className="card-link">{t('discover')}</span>
            </Link>
            <Link href="/evenements" className="contact-card contact-card--light">
              <h3>{navT('evenements')}</h3>
              <p>{t('evenements_desc')}</p>
              <span className="card-link">{t('discover')}</span>
            </Link>
            <Link href="/workshops-retraites" className="contact-card contact-card--light">
              <h3>{navT('workshops')}</h3>
              <p>{t('workshops_desc')}</p>
              <span className="card-link">{t('discover')}</span>
            </Link>
          </div>
          <p style={{ textAlign: 'center', marginTop: 40 }}>
            <BackHomeLink locale={locale} />
          </p>
        </div>
      </section>
    </div>
  );
}
