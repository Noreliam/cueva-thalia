import type { MetadataRoute } from 'next';
import { galleryCategories } from '@/lib/gallery-data';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://cueva-thalia.com').replace(/\/$/, '');
const locales = ['es', 'fr', 'en'] as const;

const staticPaths = [
  '',
  '/sejourner',
  '/evenements-prives',
  '/workshops-retraites',
  '/galerie',
  '/contact',
  '/reserver',
  '/histoire',
  '/bon-cadeau',
  '/mentions-legales',
  '/conditions-generales',
  '/politique-annulation',
  '/politique-confidentialite',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }

    for (const category of galleryCategories) {
      entries.push({
        url: `${siteUrl}/${locale}/galerie/${category.slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}
