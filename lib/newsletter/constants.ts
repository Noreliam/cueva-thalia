export const WELCOME_DISCOUNT_CODE = 'WELCOME10';
export const NEWSLETTER_SUBSCRIBED_KEY = 'cueva-thalia-newsletter-subscribed';
export const WELCOME_POPUP_DISMISSED_KEY = 'cueva-thalia-welcome-popup-dismissed';
export const EXIT_POPUP_DISMISSED_KEY = 'cueva-thalia-exit-popup-dismissed';
export const POPUP_SUPPRESS_DAYS = 30;

export function isPopupSuppressed(storageKey: string): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  const subscribed = localStorage.getItem(NEWSLETTER_SUBSCRIBED_KEY);
  if (subscribed === 'true') {
    return true;
  }

  const dismissedAt = localStorage.getItem(storageKey);
  if (!dismissedAt) {
    return false;
  }

  const elapsed = Date.now() - Number(dismissedAt);
  return elapsed < POPUP_SUPPRESS_DAYS * 24 * 60 * 60 * 1000;
}

export function markPopupDismissed(storageKey: string): void {
  localStorage.setItem(storageKey, String(Date.now()));
}

export function markNewsletterSubscribed(): void {
  localStorage.setItem(NEWSLETTER_SUBSCRIBED_KEY, 'true');
}
