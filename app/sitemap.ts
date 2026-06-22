import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { localizedPath, SITE_URL } from '@/lib/seo';

const staticPaths = [
  '',
  '/sejourner',
  '/evenements',
  '/workshops-retraites',
  '/galerie',
  '/bon-cadeau',
  '/reserver',
  '/contact',
  '/mentions-legales',
  '/conditions-generales',
  '/politique-annulation',
  '/politique-confidentialite',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${SITE_URL}${localizedPath(path, locale)}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
        alternates: {
          languages: {
            ...Object.fromEntries(
              routing.locales.map((loc) => [loc, `${SITE_URL}${localizedPath(path, loc)}`])
            ),
            'x-default': `${SITE_URL}${localizedPath(path, routing.defaultLocale)}`,
          },
        },
      });
    }
  }

  return entries;
}
