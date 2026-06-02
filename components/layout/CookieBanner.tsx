'use client';

import { Link } from '@/i18n/routing';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'cueva-thalia-cookie-consent';

type StoredConsent = 'all' | 'none' | 'custom';
type Consent = StoredConsent | null;

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

function loadGa4() {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;
  if (!gaId || typeof window === 'undefined') return;
  if (document.getElementById('ga4-script')) return;

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.defer = true;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId, { anonymize_ip: true });
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function CookieBanner({ copy }: { copy: Copy }) {
  const [consent, setConsent] = useState<Consent>(null);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as StoredConsent | null;
    if (stored === 'all') {
      setConsent('all');
      loadGa4();
    } else if (stored === 'none') {
      setConsent('none');
    } else if (stored === 'custom') {
      setConsent('custom');
    }
  }, []);

  const persist = (value: StoredConsent, withAnalytics = false) => {
    localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    if (withAnalytics) loadGa4();
  };

  if (consent !== null) return null;

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
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => persist('custom', analytics)}
            >
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
