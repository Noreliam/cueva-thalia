import { getTranslations } from 'next-intl/server';
import { BackHomeLink } from '@/components/layout/BackHomeLink';
import { getCancellationMessage } from '@/lib/booking/cancellation-policy';

export default async function PolitiqueAnnulationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const footerT = await getTranslations({ locale, namespace: 'Footer' });
  const loc = locale as 'fr' | 'es' | 'en';
  const policyText = getCancellationMessage(loc);

  return (
    <div className="seo-page">
      <div className="legal-content">
        <h1>{footerT('cancel')}</h1>
        {policyText.split('\n\n').map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="editorial-text">
            {paragraph}
          </p>
        ))}
        <p style={{ textAlign: 'center', marginTop: 48 }}>
          <BackHomeLink locale={locale} />
        </p>
      </div>
    </div>
  );
}
