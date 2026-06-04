/** Calle Las Morales 70, San Miguel de Abona — repère principal */
export const CUEVA_COORDS: [number, number] = [28.0914, -16.6242];

/** Vue sud de Tenerife : aéroport TFS, côte ouest et sud-est */
export const SOUTH_TENERIFE_BOUNDS: [[number, number], [number, number]] = [
  [28.0, -16.76],
  [28.11, -16.51],
];

export type LabelPlacement = 'above' | 'below' | 'left' | 'right';

export type LocationMapPoint = {
  id: string;
  coords: [number, number];
  placement: LabelPlacement;
};

/** Coordonnées OSM + placement des étiquettes pour limiter les chevauchements */
export const LOCATION_MAP_POINTS: LocationMapPoint[] = [
  { id: '1', coords: [28.04447, -16.57247], placement: 'above' },
  { id: '2', coords: [28.0458, -16.5375], placement: 'right' },
  { id: '3', coords: [28.078, -16.53], placement: 'left' },
  { id: '4', coords: [28.0512, -16.7158], placement: 'right' },
  { id: '5', coords: [28.0721, -16.7258], placement: 'left' },
  { id: '6', coords: [28.0621, -16.7344], placement: 'right' },
  { id: '7', coords: [28.0767, -16.7317], placement: 'left' },
];

export const CUEVA_LABEL_PLACEMENT: LabelPlacement = 'above';
