import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function CGVPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Footer' });
  return (
    <div className="seo-page">
      <div className="legal-content">
        <h1>{t('cgv')}</h1>
        <p>{`{{À COMPLÉTER avec Manon + gestor}}`}</p>
        <p style={{ textAlign: 'center', marginTop: 48 }}>
          <Link href="/" className="btn btn-secondary">← Retour à l&apos;accueil</Link>
        </p>
      </div>
    </div>
  );
}
