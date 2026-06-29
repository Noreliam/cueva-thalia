/**
 * Logique de tarification pour les réservations
 *
 * Structure:
 * - Tarifs de base par nuit (weekend vs weekday)
 * - Surcharges / promos par période (data/pricing-overrides.json)
 * - Minimums (nuits, invités)
 */

import { getPricingOverrideRates } from '@/lib/booking/pricing-overrides';

/**
 * Configuration des tarifs (Cueva Thalía)
 *
 * Tarifs de base:
 * - 200€/nuit lundi-jeudi
 * - 250€/nuit vendredi, samedi, dimanche et jours fériés
 *
 * Limites:
 * - Jusqu'à 4 personnes: tarif standard
 * - 5+ personnes: contact direct pour devis (frais additionnels possibles)
 * - Tarifs progressifs possibles pour plusieurs nuits (sur demande)
 */
const BASE_RATES = {
  peakDay: 250,  // EUR, vendredi/samedi/jours fériés
  offDay: 200,   // EUR, lundi-jeudi (hors jours fériés)
};

// Important: Cette implémentation est pour les réservations JUSQU'À 4 PERSONNES
// Au-delà, c'est un devis personnalisé via WhatsApp/email
const MAX_GUESTS_ONLINE = 4;    // Réservation online possible
const MAX_GUESTS_TOTAL = 16;    // Capacité max avec couchages supplémentaires
const MIN_NIGHTS = 1;           // Minimum 1 nuit (à confirmer)
const DEPOSIT = 15000;          // 150€ en centimes

interface PricingResult {
  nights: number;
  totalEUR: number;
  amountCents: number;
  breakdown: {
    nightsCount: number;
    baseTotal: number;
    guestDiscount: number;
    finalTotal: number;
  };
}

/**
 * Calcule le nombre de nuits entre deux dates
 */
export function calculateNights(checkIn: Date | string, checkOut: Date | string): number {
  const from = typeof checkIn === 'string' ? new Date(checkIn) : checkIn;
  const to = typeof checkOut === 'string' ? new Date(checkOut) : checkOut;

  // Reset time to midnight
  from.setHours(0, 0, 0, 0);
  to.setHours(0, 0, 0, 0);

  const diffMs = to.getTime() - from.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return Math.ceil(diffDays);
}

/**
 * Jours fériés nationaux espagnols (tarif week-end / 250 €).
 * Les fêtes mobiles (Pâques, etc.) peuvent être ajoutées ultérieurement.
 */
function isSpanishPublicHoliday(month: number, dateOfMonth: number): boolean {
  const fixed: [number, number][] = [
    [0, 1],   // 1 janvier
    [0, 6],   // 6 janvier
    [4, 1],   // 1 mai
    [7, 15],  // 15 août
    [9, 12],  // 12 octobre
    [10, 1],  // 1 novembre
    [11, 25], // 25 décembre
  ];
  return fixed.some(([m, d]) => m === month && d === dateOfMonth);
}

/**
 * Détermine si une date est un jour à tarif élevé
 * (vendredi 5, samedi 6, dimanche 0)
 *
 * Tarif bas (200€): lundi (1) - jeudi (4)
 *
 * Tarif élevé (250€): vendredi (5), samedi (6), dimanche (0), jours fériés
 */
function isPeakDay(date: Date): boolean {
  const day = date.getDay();
  const month = date.getMonth();
  const dateOfMonth = date.getDate();

  // Vendredi (5), Samedi (6), ou Dimanche (0)
  if (day === 0 || day === 5 || day === 6) {
    return true;
  }

  if (isSpanishPublicHoliday(month, dateOfMonth)) {
    return true;
  }

  return false;
}

/**
 * Calcule le prix d'une réservation
 *
 * ⚠️ IMPORTANT:
 * - Jusqu'à 4 personnes: tarification en ligne
 * - 5+ personnes: devis personnalisé via WhatsApp/email
 *
 * @param checkIn - Date d'arrivée (ISO string ou Date object)
 * @param checkOut - Date de départ (ISO string ou Date object)
 * @param guestCount - Nombre d'invités
 * @returns PricingResult avec détails du calcul
 * @throws Error si les dates/invités sont invalides
 */
export function calculateBookingPrice(
  checkIn: Date | string,
  checkOut: Date | string,
  guestCount: number,
): PricingResult {
  const checkInDate = typeof checkIn === 'string' ? new Date(checkIn) : checkIn;
  const checkOutDate = typeof checkOut === 'string' ? new Date(checkOut) : checkOut;

  // Validation
  if (checkInDate >= checkOutDate) {
    throw new Error('Check-in must be before check-out');
  }

  const nights = calculateNights(checkInDate, checkOutDate);

  if (nights < MIN_NIGHTS) {
    throw new Error(`Minimum ${MIN_NIGHTS} night required`);
  }

  // Online booking possible jusqu'à 4 personnes
  // Au-delà, c'est un devis personnalisé
  if (guestCount < 1) {
    throw new Error('At least 1 guest required');
  }

  if (guestCount > MAX_GUESTS_ONLINE) {
    throw new Error(
      `Online booking available for up to ${MAX_GUESTS_ONLINE} guests. For ${guestCount} guests, please contact us via WhatsApp or email for a custom quote.`
    );
  }

  // Calcule le prix nuit par nuit
  let baseTotal = 0;
  let currentDate = new Date(checkInDate);

  while (currentDate < checkOutDate) {
    const { peakDay, offDay } = getPricingOverrideRates(currentDate, BASE_RATES.peakDay, BASE_RATES.offDay);
    const rate = isPeakDay(currentDate) ? peakDay : offDay;
    baseTotal += rate;
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // TODO: Ajouter tarifs progressifs pour plusieurs nuits
  // Exemple: -5% pour 7+ nuits, -10% pour 14+ nuits
  const progressiveDiscount = 0; // À implémenter

  const finalTotal = baseTotal - progressiveDiscount;

  return {
    nights,
    totalEUR: finalTotal,
    amountCents: Math.round(finalTotal * 100),
    breakdown: {
      nightsCount: nights,
      baseTotal: Math.round(baseTotal * 100) / 100,
      guestDiscount: progressiveDiscount,
      finalTotal: Math.round(finalTotal * 100) / 100,
    },
  };
}

/**
 * Génère un identifiant de réservation lisible
 * Format: CT-YYYYMMDD-XXXXX (ex: CT-20240615-A7K9M)
 */
export function generateBookingId(): string {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
  const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `CT-${dateStr}-${randomStr}`;
}

/**
 * Obtient le message de prix formaté pour le produit Stripe
 */
export function getBookingProductName(locale: 'fr' | 'es' | 'en', nights: number, guestCount: number): string {
  const pluralNight =
    locale === 'fr' ? (nights > 1 ? 'nuits' : 'nuit') :
    locale === 'es' ? (nights > 1 ? 'noches' : 'noche') :
    (nights > 1 ? 'nights' : 'night');

  const pluralGuest =
    locale === 'fr' ? (guestCount > 1 ? 'invités' : 'invité') :
    locale === 'es' ? (guestCount > 1 ? 'huéspedes' : 'huésped') :
    (guestCount > 1 ? 'guests' : 'guest');

  const labels = {
    fr: `Cueva Thalía — ${nights} ${pluralNight}, ${guestCount} ${pluralGuest}`,
    es: `Cueva Thalía — ${nights} ${pluralNight}, ${guestCount} ${pluralGuest}`,
    en: `Cueva Thalía — ${nights} ${pluralNight}, ${guestCount} ${pluralGuest}`,
  };

  return labels[locale] || labels.en;
}

/**
 * Valide les paramètres de réservation
 * Utile pour des validations avant de créer une session Stripe
 */
/**
 * Valide les paramètres de réservation
 * Utile pour des validations avant de créer une session Stripe
 */
export function validateBookingParams(
  checkIn: string,
  checkOut: string,
  guestCount: number,
): { valid: boolean; error?: string } {
  try {
    calculateBookingPrice(checkIn, checkOut, guestCount);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : 'Invalid booking parameters',
    };
  }
}

/**
 * Information de tarif pour affichage client
 * Retourne la structure de tarif pour une plage de dates
 */
export function getPricingInfo(nights: number, guestCount: number) {
  return {
    nights,
    guestCount,
    baseRatePerNight: {
      peakDay: BASE_RATES.peakDay,
      offDay: BASE_RATES.offDay,
    },
    maxGuestsOnline: MAX_GUESTS_ONLINE,
    maxGuestsTotal: MAX_GUESTS_TOTAL,
    deposit: DEPOSIT / 100, // Convert to EUR
    disclaimer:
      guestCount > MAX_GUESTS_ONLINE
        ? `For ${guestCount} guests, please contact us via WhatsApp or email for a custom quote.`
        : null,
  };
}
