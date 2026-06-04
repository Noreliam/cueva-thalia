import { getTranslations } from 'next-intl/server';
import BonCadeauPageContent from '@/components/bon-cadeau/BonCadeauPageContent';
import '@/components/bon-cadeau/bon-cadeau.css';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BonCadeau' });
  return { title: `${t('title')} | Cueva Thalía`, description: t('hero_lead') };
}

export default async function BonCadeauPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BonCadeau' });

  return (
    <div className="seo-page seo-page--bon-cadeau">
      <BonCadeauPageContent
        copy={{
          heroTitle: t('hero_title'),
          heroLead: t('hero_lead'),
          cta: t('cta'),
          validity: t('validity'),
          formTitle: t('form_title'),
          closeModal: t('close_modal'),
          backHome: t('back_home'),
        }}
      />
    </div>
  );
}
