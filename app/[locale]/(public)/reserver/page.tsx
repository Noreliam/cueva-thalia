import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return { title: `${t('reserver')} | Cueva Thalía` };
}

export default async function ReserverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Navigation' });
  return (
    <div className="seo-page">
      <section className="contact" style={{ paddingTop: 100 }}>
        <div className="container">
          <h1 style={{ textAlign: 'center' }}>{t('reserver')}</h1>
          <p className="editorial-text" style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
            Choisissez votre expérience à Cueva Thalía.
          </p>
          <div className="contact-methods">
            <Link href="/sejourner" className="contact-card">
              <h3>{t('sejourner')}</h3>
              <p>Réserver votre séjour avec piscine privatisée.</p>
              <span className="card-link">Découvrir →</span>
            </Link>
            <Link href="/evenements-prives" className="contact-card">
              <h3>{t('evenements')}</h3>
              <p>Demander un devis pour un événement intime.</p>
              <span className="card-link">Découvrir →</span>
            </Link>
            <Link href="/workshops-retraites" className="contact-card">
              <h3>{t('workshops')}</h3>
              <p>Organiser une retraite ou un atelier bien-être.</p>
              <span className="card-link">Découvrir →</span>
            </Link>
          </div>
          <p style={{ textAlign: 'center', marginTop: 64 }}>
            <Link href="/" className="btn btn-secondary">← Retour à l&apos;accueil</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
