export type BookingLocale = 'fr' | 'es' | 'en';

export function normalizeBookingLocale(locale: string): BookingLocale {
  if (locale === 'fr' || locale === 'en' || locale === 'es') {
    return locale;
  }
  return 'es';
}
