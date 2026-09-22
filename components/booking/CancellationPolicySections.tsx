import { getCancellationPolicyContent } from '@/lib/booking/cancellation-policy';

export function CancellationPolicySections({
  locale,
  headingAs = 'h2',
  hideIntro = false,
}: {
  locale: 'fr' | 'es' | 'en';
  headingAs?: 'h2' | 'h3';
  hideIntro?: boolean;
}) {
  const policy = getCancellationPolicyContent(locale);
  const Heading = headingAs;

  return (
    <>
      {!hideIntro && <p className="editorial-text">{policy.intro}</p>}
      {policy.sections.map((section) => (
        <section key={section.title} className="cancellation-policy-section">
          <Heading>{section.title}</Heading>
          <ul className="editorial-text">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
