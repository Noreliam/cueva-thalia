import { HomePageContent } from '@/components/home/HomePageContent';
import { SiteClientEffects } from '@/components/site/SiteClientEffects';
import { lodgingBusinessJsonLd } from '@/lib/structured-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cueva Thalía — Maison privée avec piscine chauffée à Tenerife',
  description:
    'Séjournez dans une cueva privée à Tenerife avec piscine intérieure chauffée, jardin privé et atmosphère immersive. Réservation directe et événements sur demande.',
  openGraph: {
    title: 'Cueva Thalía — Maison privée à Tenerife',
    description: 'Découvrez une cueva privée avec piscine intérieure chauffée au sud de Tenerife.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessJsonLd) }}
      />
      <SiteClientEffects />
      <HomePageContent />
    </>
  );
}
