import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Histoire' });
  return { title: `${t('title')} | Cueva Thalía` };
}

export default async function HistoirePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Histoire' });
  return (
    <div className="seo-page">
      <div className="legal-content">
        <p className="small-caps" style={{ textAlign: 'center', color: 'var(--ct-terracotta)' }}>{t('title')}</p>
        <h1>{t('hero_title')}</h1>
        <p className="editorial-text">« {t('content_p1')} »</p>
        <p className="editorial-text">« {t('content_p2')} »</p>
        <p className="editorial-text" style={{ color: 'var(--ct-terracotta)', fontStyle: 'italic', fontSize: '1.35rem' }}>
          « {t('content_p3')} »
        </p>
        <p style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/" className="btn btn-secondary">← Retour à l&apos;accueil</Link>
        </p>
      </div>
    </div>
  );
}
