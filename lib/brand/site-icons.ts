import type { Metadata } from 'next';

/** Fichiers statiques dans /public — chemins absolus depuis la racine du site */
export const siteIcons: NonNullable<Metadata['icons']> = {
  icon: [
    { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    { url: '/brand/favicon-64.png', sizes: '64x64', type: 'image/png' },
    { url: '/favicon.svg', type: 'image/svg+xml' },
  ],
  apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
};
