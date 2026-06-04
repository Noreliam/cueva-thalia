'use client';

import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  CUEVA_COORDS,
  CUEVA_LABEL_PLACEMENT,
  LOCATION_MAP_POINTS,
  SOUTH_TENERIFE_BOUNDS,
  type LabelPlacement,
} from '@/lib/location-map-data';

export type LocationMapLabel = {
  id: string;
  name: string;
  time: string;
};

type LocationMapProps = {
  cuevaLabel: string;
  cuevaAddress: string;
  points: LocationMapLabel[];
};

const LABEL_W = 128;
const LABEL_H = 52;
const PIN = 8;

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function anchorForPlacement(placement: LabelPlacement): [number, number] {
  switch (placement) {
    case 'above':
      return [LABEL_W / 2, LABEL_H + PIN];
    case 'below':
      return [LABEL_W / 2, 0];
    case 'left':
      return [LABEL_W + PIN, LABEL_H / 2];
    case 'right':
      return [0, LABEL_H / 2];
    default:
      return [LABEL_W / 2, LABEL_H + PIN];
  }
}

function labelIcon(
  id: string,
  name: string,
  subline: string,
  placement: LabelPlacement,
  variant: 'cueva' | 'place',
) {
  const sublineClass =
    variant === 'cueva' ? 'location-map-label-sub' : 'location-map-label-time';

  const html = `
    <div class="location-map-label location-map-label--${variant} location-map-label--${placement}">
      <div class="location-map-label-card">
        <span class="location-map-label-name">${escapeHtml(name)}</span>
        <span class="${sublineClass}">${escapeHtml(subline)}</span>
      </div>
      <span class="location-map-label-pin" aria-hidden="true"></span>
    </div>
  `;

  const wrapH = placement === 'left' || placement === 'right' ? LABEL_H : LABEL_H + PIN;
  const wrapW = placement === 'left' || placement === 'right' ? LABEL_W + PIN : LABEL_W;

  return L.divIcon({
    className: `location-map-label-wrap location-map-label-wrap--${id}`,
    html,
    iconSize: [wrapW, wrapH],
    iconAnchor: anchorForPlacement(placement),
  });
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(SOUTH_TENERIFE_BOUNDS, { padding: [36, 36], maxZoom: 11 });
  }, [map]);
  return null;
}

export function LocationMap({ cuevaLabel, cuevaAddress, points }: LocationMapProps) {
  const pointsById = useMemo(
    () => new Map(points.map((p) => [p.id, p])),
    [points],
  );

  const cuevaIcon = useMemo(
    () => labelIcon('cueva', cuevaLabel, cuevaAddress, CUEVA_LABEL_PLACEMENT, 'cueva'),
    [cuevaLabel, cuevaAddress],
  );

  return (
    <MapContainer
      className="location-map-leaflet"
      bounds={SOUTH_TENERIFE_BOUNDS}
      scrollWheelZoom={false}
      attributionControl
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
      />
      <ZoomControl position="bottomright" />
      <FitBounds />

      <Marker position={CUEVA_COORDS} icon={cuevaIcon} zIndexOffset={500} />

      {LOCATION_MAP_POINTS.map((point) => {
        const label = pointsById.get(point.id);
        if (!label) return null;
        return (
          <Marker
            key={point.id}
            position={point.coords}
            icon={labelIcon(point.id, label.name, label.time, point.placement, 'place')}
            zIndexOffset={100}
          />
        );
      })}
    </MapContainer>
  );
}
