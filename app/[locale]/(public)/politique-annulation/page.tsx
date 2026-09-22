import { BackHomeLink } from '@/components/layout/BackHomeLink';
import { CancellationPolicySections } from '@/components/booking/CancellationPolicySections';
import { getCancellationPolicyContent } from '@/lib/booking/cancellation-policy';

export default async function PolitiqueAnnulationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as 'fr' | 'es' | 'en';
  const policy = getCancellationPolicyContent(loc);

  return (
    <div className="seo-page">
      <div className="legal-content">
        <h1>{policy.title}</h1>
        <CancellationPolicySections locale={loc} />
        <p style={{ textAlign: 'center', marginTop: 48 }}>
          <BackHomeLink locale={locale} />
        </p>
      </div>
    </div>
  );
}
