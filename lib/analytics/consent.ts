export const CONSENT_STORAGE_KEY = 'cueva-thalia-cookie-consent';
export const ANALYTICS_STORAGE_KEY = 'cueva-thalia-cookie-analytics';

export type ConsentChoice = 'all' | 'none' | 'custom';

export type StoredConsent = {
  choice: ConsentChoice;
  analytics: boolean;
};

export function readStoredConsent(): StoredConsent | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const choice = localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
  if (!choice) {
    return null;
  }

  if (choice === 'all') {
    return { choice, analytics: true };
  }

  if (choice === 'none') {
    return { choice, analytics: false };
  }

  return {
    choice: 'custom',
    analytics: localStorage.getItem(ANALYTICS_STORAGE_KEY) === 'true',
  };
}

export function hasAnalyticsConsent(): boolean {
  return readStoredConsent()?.analytics === true;
}

export function writeStoredConsent(choice: ConsentChoice, analytics: boolean): void {
  localStorage.setItem(CONSENT_STORAGE_KEY, choice);

  if (choice === 'custom') {
    localStorage.setItem(ANALYTICS_STORAGE_KEY, analytics ? 'true' : 'false');
  } else {
    localStorage.removeItem(ANALYTICS_STORAGE_KEY);
  }
}
