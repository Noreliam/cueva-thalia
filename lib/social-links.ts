export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/cueva.thalia_tf?utm_source=qr',
  facebook: 'https://www.facebook.com/share/1E6E4pZR9y/?mibextid=wwXIfr',
  tiktok: 'https://www.tiktok.com/@cueva.thalia.tene?_r=1&_t=ZN-97SWrU57rF8',
} as const;

export const CHECKIN_GENERIC_URL = 'https://go.checkinscan.com/checkin/UkJ3pSkhqc';

export function socialLinksHtml(locale: 'fr' | 'es' | 'en'): string {
  const labels = {
    fr: 'Retrouvez-nous sur',
    es: 'Encuéntrenos en',
    en: 'Find us on',
  };

  return `
<p style="margin-top:24px;">
  ${labels[locale]}
  <a href="${SOCIAL_LINKS.instagram}" style="margin:0 8px;">Instagram</a> ·
  <a href="${SOCIAL_LINKS.facebook}" style="margin:0 8px;">Facebook</a> ·
  <a href="${SOCIAL_LINKS.tiktok}" style="margin:0 8px;">TikTok</a>
</p>`.trim();
}
