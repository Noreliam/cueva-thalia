import { getTranslations } from 'next-intl/server';
import { BackHomeLink } from '@/components/layout/BackHomeLink';

export default async function PolitiqueAnnulationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const footerT = await getTranslations({ locale, namespace: 'Footer' });
  const commonT = await getTranslations({ locale, namespace: 'Common' });
  return (
    <div className="seo-page">
      <div className="legal-content">
        <h1>{footerT('cancel')}</h1>
        <p>{commonT('legal_placeholder')}</p>
        <p style={{ textAlign: 'center', marginTop: 48 }}>
          <BackHomeLink locale={locale} />
        </p>
      </div>
    </div>
  );
}
