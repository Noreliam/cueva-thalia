import { getTranslations } from 'next-intl/server';
import GiftCardForm from '@/components/forms/GiftCardForm';
import { Link } from '@/i18n/routing';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BonCadeau' });
  return { title: `${t('title')} | Cueva Thalía`, description: t('hero_subtitle') };
}

export default async function BonCadeauPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BonCadeau' });
  return (
    <div className="seo-page">
      <section className="contact" style={{ paddingTop: 100 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h1 style={{ textAlign: 'center' }}>{t('hero_title')}</h1>
          <p className="editorial-text" style={{ textAlign: 'center', marginBottom: 48 }}>{t('hero_subtitle')}</p>
          <h2 style={{ marginBottom: 24 }}>{t('form_title')}</h2>
          <GiftCardForm />
          <p style={{ textAlign: 'center', marginTop: 64 }}>
            <Link href="/" className="card-link">← Retour à l&apos;accueil</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
