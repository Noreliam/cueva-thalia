import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export default async function NotFoundPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NotFound' });

  return (
    <section className="not-found-page">
      <div className="container" style={{ textAlign: 'center', padding: '160px 20px' }}>
        <h1>{t('title')}</h1>
        <p className="editorial-text" style={{ margin: '24px auto 40px', maxWidth: 480 }}>
          {t('text')}
        </p>
        <Link href="/" className="btn btn-primary">
          {t('home')}
        </Link>
      </div>
    </section>
  );
}
