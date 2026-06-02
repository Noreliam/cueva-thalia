'use client';

import { useEffect, useState } from 'react';

export default function SmoobuWidget() {
  const [mounted, setMounted] = useState(false);
  const widgetId = process.env.NEXT_PUBLIC_SMOOBU_WIDGET_ID;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-[500px] w-full bg-ct-blanc-casse animate-pulse rounded-lg border border-ct-dune/20" />;
  }

  if (!widgetId) {
    return (
      <div className="p-8 text-center border border-ct-dune bg-ct-blanc-casse/50 rounded-lg">
        <p className="text-ct-brun-chaud font-medium">Widget de réservation</p>
        <p className="text-sm text-ct-brun-chaud/70 mt-2">
          {`// TODO webdev: Ajouter l'ID Smoobu dans la variable d'environnement NEXT_PUBLIC_SMOOBU_WIDGET_ID`}
        </p>
      </div>
    );
  }

  return (
    <div className="smoobu-widget-container w-full min-h-[500px] rounded-lg overflow-hidden bg-white shadow-sm border border-ct-dune/20">
      <iframe
        src={`https://login.smoobu.com/fr/booking-widget/iframe/${widgetId}`}
        width="100%"
        height="100%"
        className="min-h-[500px] border-none"
        title="Réservation Smoobu"
        loading="lazy"
      />
    </div>
  );
}
