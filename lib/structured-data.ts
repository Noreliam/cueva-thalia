import { SITE_URL } from '@/lib/seo';

export const lodgingBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Cueva Thalía',
  description: 'Maison troglodyte privée avec piscine intérieure chauffée',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Calle Las Morales 70',
    addressLocality: 'San Miguel de Abona',
    addressRegion: 'Tenerife',
    postalCode: '38620',
    addressCountry: 'ES',
  },
  telephone: '+34657077910',
  url: SITE_URL,
  priceRange: '€€',
  checkinTime: '16:00',
  checkoutTime: '13:00',
  sameAs: [
    'https://www.google.com/maps/search/?api=1&query=Calle+Las+Morales+70,+38620+San+Miguel+de+Abona,+Tenerife',
  ],
};
