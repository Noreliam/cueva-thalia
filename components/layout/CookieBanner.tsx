'use client';

import { writeStoredConsent, readStoredConsent, type ConsentChoice } from '@/lib/analytics/consent';
import { loadGa4Script } from '@/lib/analytics/ga4';
import { Link } from '@/i18n/routing';
import { useEffect, useState } from 'react';

type Copy = {
  title: string;
  text: string;
  accept: string;
  reject: string;
  customize: string;
  save: string;
  analytics: string;
  privacy: string;
};

export default function CookieBanner({ copy }: { copy: Copy }) {
  const [consent, setConsent] = useState<ConsentChoice | null>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    if (!stored) {
      return;
    }

    setConsent(stored.choice);
    if (stored.analytics) {
      loadGa4Script();
    }
  }, []);

  const persist = (choice: ConsentChoice, withAnalytics = false) => {
    writeStoredConsent(choice, withAnalytics);
    setConsent(choice);
    if (withAnalytics) {
      loadGa4Script();
    }
  };

  if (consent !== null) {
    return null;
  }

  return (
    <div className="cookie-banner" role="dialog" aria-labelledby="cookie-title">
      <div className="cookie-banner-inner">
        <h2 id="cookie-title">{copy.title}</h2>
        <p>{copy.text}</p>
        {showCustomize ? (
          <label className="cookie-option">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            {copy.analytics}
          </label>
        ) : null}
        <div className="cookie-actions">
          <button type="button" className="btn btn-primary" onClick={() => persist('all', true)}>
            {copy.accept}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => persist('none')}>
            {copy.reject}
          </button>
          {!showCustomize ? (
            <button type="button" className="link-subtle" onClick={() => setShowCustomize(true)}>
              {copy.customize}
            </button>
          ) : (
            <button type="button" className="btn btn-secondary" onClick={() => persist('custom', analytics)}>
              {copy.save}
            </button>
          )}
        </div>
        <Link href="/politique-confidentialite" className="cookie-privacy">
          {copy.privacy}
        </Link>
      </div>
    </div>
  );
}
