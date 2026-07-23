import { hasAnalyticsConsent } from '@/lib/analytics/consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let scriptRequested = false;

function getGa4Id(): string | undefined {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID?.trim();
  return gaId || undefined;
}

export function isGa4Configured(): boolean {
  return Boolean(getGa4Id());
}

export function initGa4IfConsented(): void {
  if (!hasAnalyticsConsent() || !getGa4Id()) {
    return;
  }

  loadGa4Script();
}

export function loadGa4Script(): void {
  const gaId = getGa4Id();
  if (!gaId || typeof window === 'undefined' || scriptRequested) {
    return;
  }

  scriptRequested = true;

  if (document.getElementById('ga4-script')) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', gaId, {
    anonymize_ip: true,
    send_page_view: false,
  });

  const script = document.createElement('script');
  script.id = 'ga4-script';
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.async = true;
  document.head.appendChild(script);
}

export function trackPageView(path: string): void {
  const gaId = getGa4Id();
  if (!gaId || !hasAnalyticsConsent() || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackGa4Event(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', name, params);
}
