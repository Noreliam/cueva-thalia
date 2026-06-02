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
      <section className="gallery-hero">
        <div
          className="gallery-hero-bg"
          style={{
            backgroundImage: `linear-gradient(rgba(90, 56, 37, 0.35), rgba(90, 56, 37, 0.35)), url('/photos/optimized/7ea5a8c2-b48b-4a12-b7be-034ca90b0d8e.jpg')`,
          }}
        />
        <div className="gallery-hero-content">
          <h1>{t('hero_title')}</h1>
          <p className="editorial-text page-hero-lead">{t('hero_subtitle')}</p>
        </div>
      </section>

      <section className="page-form-section">
        <div className="container">
          <div className="page-form-header">
            <h2>{t('form_title')}</h2>
          </div>
          <div className="custom-form">
            <GiftCardForm />
          </div>
          <p className="contact-back">
            <Link href="/" className="card-link">
              ← Retour à l&apos;accueil
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
