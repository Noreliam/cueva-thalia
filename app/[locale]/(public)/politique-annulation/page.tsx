import { getTranslations } from 'next-intl/server';
import { BackHomeLink } from '@/components/layout/BackHomeLink';
import { getCancellationPolicyContent } from '@/lib/booking/cancellation-policy';

export default async function PolitiqueAnnulationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const footerT = await getTranslations({ locale, namespace: 'Footer' });
  const loc = locale as 'fr' | 'es' | 'en';
  const policy = getCancellationPolicyContent(loc);

  return (
    <div className="seo-page">
      <div className="legal-content">
        <h1>{footerT('cancel')}</h1>
        <p className="editorial-text">{policy.intro}</p>
        {policy.sections.map((section) => (
          <section key={section.title} style={{ marginTop: 32 }}>
            <h2>{section.title}</h2>
            <ul className="editorial-text">
              {section.items.map((item) => (
                <li key={item.slice(0, 40)}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
        <p style={{ textAlign: 'center', marginTop: 48 }}>
          <BackHomeLink locale={locale} />
        </p>
      </div>
    </div>
  );
}
