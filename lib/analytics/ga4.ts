import { hasAnalyticsConsent } from '@/lib/analytics/consent';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getGa4Id(): string | undefined {
  const gaId = process.env.NEXT_PUBLIC_GA4_ID?.trim();
  return gaId || undefined;
}

export function isGa4Configured(): boolean {
  return Boolean(getGa4Id());
}

function canUseGtag(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

export function grantAnalyticsConsent(): void {
  if (!canUseGtag()) {
    return;
  }

  window.gtag!('consent', 'update', {
    analytics_storage: 'granted',
  });
}

export function denyAnalyticsConsent(): void {
  if (!canUseGtag()) {
    return;
  }

  window.gtag!('consent', 'update', {
    analytics_storage: 'denied',
  });
}

export function syncAnalyticsConsentFromStorage(): void {
  if (hasAnalyticsConsent()) {
    grantAnalyticsConsent();
  } else {
    denyAnalyticsConsent();
  }
}

export function trackPageView(path: string): void {
  const gaId = getGa4Id();
  if (!gaId || !hasAnalyticsConsent() || !canUseGtag()) {
    return;
  }

  window.gtag!('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackGa4Event(
  name: string,
  params?: Record<string, string | number | boolean | undefined>,
): void {
  if (!hasAnalyticsConsent() || !canUseGtag()) {
    return;
  }

  window.gtag!('event', name, params);
}
