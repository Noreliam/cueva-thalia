import { smoobuFetch } from '@/lib/smoobu/client';

type PlaceholdersResponse = {
  placeholders?: { key: string; value: string }[];
};

const LOCALE_PLACEHOLDER_KEYS: Record<'fr' | 'es' | 'en', string[]> = {
  fr: ['onlineCheckInLinkFR', 'onlineCheckInLink'],
  es: ['onlineCheckInLinkES', 'onlineCheckInLink'],
  en: ['onlineCheckInLinkEN', 'onlineCheckInLink'],
};

function extractUrlFromPlaceholderValue(value: string): string | null {
  const hrefMatch = value.match(/href="([^"]+)"/i);
  if (hrefMatch?.[1]) {
    return hrefMatch[1];
  }

  const trimmed = value.replace(/<[^>]+>/g, '').trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }

  return null;
}

export async function getOnlineCheckInLink(
  reservationId: number,
  locale: string,
): Promise<string | null> {
  const loc = locale === 'fr' || locale === 'es' || locale === 'en' ? locale : 'es';
  const keys = LOCALE_PLACEHOLDER_KEYS[loc];

  const data = await smoobuFetch<PlaceholdersResponse>(
    `/api/reservations/${reservationId}/placeholders`,
    { method: 'GET' },
  );

  for (const key of keys) {
    const placeholder = data.placeholders?.find((entry) => entry.key === key);
    if (!placeholder?.value) continue;
    const url = extractUrlFromPlaceholderValue(placeholder.value);
    if (url) return url;
  }

  return null;
}
