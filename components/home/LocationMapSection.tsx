'use client';

import { useEffect, useState } from 'react';
import type { LocationMapLabel } from '@/components/home/LocationMap';

type LocationMapSectionProps = {
  ariaLabel: string;
  cuevaLabel: string;
  cuevaAddress: string;
  points: LocationMapLabel[];
};

type LocationMapComponent = typeof import('@/components/home/LocationMap').LocationMap;

export function LocationMapSection(props: LocationMapSectionProps) {
  const [Map, setMap] = useState<LocationMapComponent | null>(null);

  useEffect(() => {
    void import('@/components/home/LocationMap').then((mod) => {
      setMap(() => mod.LocationMap);
    });
  }, []);

  if (!Map) {
    return <div className="map-stylisee map-stylisee--loading" aria-hidden="true" />;
  }

  const { ariaLabel, ...mapProps } = props;

  return (
    <div className="map-stylisee" role="region" aria-label={ariaLabel}>
      <Map {...mapProps} />
    </div>
  );
}
