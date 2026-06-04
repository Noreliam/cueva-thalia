/**
 * Politique d'annulation et de modification des réservations
 * Selon le CDC Cueva Thalía
 */

export interface CancellationPolicyResult {
  daysBeforeArrival: number;
  policy: 'full-refund' | 'deposit-lost' | 'deposit-kept-plus-penalty';
  depositLost: boolean;
  penalty: number; // Percentage
  description: string;
}

/**
 * Calcule la politique d'annulation selon les jours avant arrivée
 *
 * Règles:
 * - Plus de 15 jours avant : modification possible, sans frais (si disponibilité)
 * - Moins de 15 jours avant : acompte conservé + 50% de pénalité pour report
 * - Annulation définitive : acompte non remboursable
 */
export function calculateCancellationPolicy(
  checkInDate: Date | string,
  requestDate: Date = new Date(),
): CancellationPolicyResult {
  const checkIn = typeof checkInDate === 'string' ? new Date(checkInDate) : checkInDate;
  const request = typeof requestDate === 'string' ? new Date(requestDate) : requestDate;

  // Normalize dates to midnight
  checkIn.setHours(0, 0, 0, 0);
  request.setHours(0, 0, 0, 0);

  const daysBeforeArrival = Math.ceil((checkIn.getTime() - request.getTime()) / (1000 * 60 * 60 * 24));

  if (daysBeforeArrival > 15) {
    return {
      daysBeforeArrival,
      policy: 'full-refund',
      depositLost: false,
      penalty: 0,
      description: `Modification possible (more than 15 days before arrival). Subject to availability. No penalties.`,
    };
  }

  if (daysBeforeArrival > 0) {
    return {
      daysBeforeArrival,
      policy: 'deposit-kept-plus-penalty',
      depositLost: false,
      penalty: 50,
      description: `Modification within 15 days of arrival: deposit kept + 50% penalty for reschedule.`,
    };
  }

  // daysBeforeArrival <= 0 (already arrived or on arrival date)
  return {
    daysBeforeArrival,
    policy: 'deposit-lost',
    depositLost: true,
    penalty: 100,
    description: `No modification or cancellation possible. Full deposit retained.`,
  };
}

/**
 * Calcule le montant remboursable/pénalité selon la politique
 */
export function calculateRefundAmount(
  depositAmount: number, // in EUR
  daysBeforeArrival: number,
): {
  refund: number;
  penalty: number;
  policy: string;
} {
  const policyResult = calculateCancellationPolicy(
    new Date(Date.now() + daysBeforeArrival * 24 * 60 * 60 * 1000),
  );

  if (policyResult.policy === 'full-refund') {
    return {
      refund: depositAmount,
      penalty: 0,
      policy: 'Full refund (modification > 15 days before)',
    };
  }

  if (policyResult.policy === 'deposit-kept-plus-penalty') {
    const penalty = depositAmount * 0.5;
    return {
      refund: 0,
      penalty,
      policy: 'Deposit retained + 50% penalty for reschedule',
    };
  }

  // deposit-lost
  return {
    refund: 0,
    penalty: depositAmount,
    policy: 'Deposit non-refundable',
  };
}

/**
 * Règles générales et conditions de réservation
 */
export const BOOKING_RULES = {
  deposit: {
    amount: 150, // EUR — acompte non remboursable
    nonRefundable: true,
    description: 'Non-refundable deposit required for confirmation',
  },
  cancellation: {
    modificationWindow: 15, // days before arrival
    policy: 'Modifications possible if more than 15 days before arrival (subject to availability)',
  },
  guests: {
    minGuests: 1,
    maxGuestsOnline: 4, // Direct booking
    maxGuestsTotal: 16, // With extra mattresses
    additionalGuestFees: true,
    description:
      'Additional guests must be declared before arrival. Fees apply for each extra guest with additional bedding.',
  },
  rules: [
    'Pets allowed if clean, calm, and well-behaved',
    'Smoking prohibited inside the cueva',
    'Swimming pool is for relaxation only, not for parties or vigorous activities',
    'Respect of neighborhood is essential',
    'No automatic event authorization - each request evaluated individually',
    'Additional guests must be declared before arrival',
    'All persons use facilities at their own risk',
    'Property must be returned in reasonable cleanliness',
    'Damages or non-compliance may result in additional fees or immediate termination',
  ],
  adults: {
    minAge: 18,
    description: 'Guests must be at least 18 years old',
  },
};

/**
 * Message de politique d'annulation pour les clients
 */
export function getCancellationMessage(locale: 'fr' | 'es' | 'en' = 'en'): string {
  const messages = {
    fr: `Conditions d'annulation et de modification :

Toute réservation confirmée implique le versement d'un acompte de 150€ (non remboursable).

- Annulation définitive : l'acompte versé est non remboursable.
- Modification de date (> 15 jours avant) : possible sous réserve de disponibilité, sans frais supplémentaires.
- Modification de date (< 15 jours avant) : l'acompte est conservé et une pénalité de 50% s'applique pour le report.

Ces conditions permettent de préserver l'organisation du lieu et les disponibilités bloquées.`,

    es: `Condiciones de cancelación y modificación:

Toda reserva confirmada implica el pago de un depósito de 150€ (no reembolsable).

- Cancelación definitiva: el depósito versado no es reembolsable.
- Cambio de fecha (> 15 días antes): posible según disponibilidad, sin gastos adicionales.
- Cambio de fecha (< 15 días antes): se retiene el depósito y se aplica una penalización del 50% para el cambio.

Estas condiciones permiten preservar la organización del lugar y las disponibilidades reservadas.`,

    en: `Cancellation and Modification Terms:

All confirmed bookings require a non-refundable deposit of €150.

- Definitive cancellation: the deposit is non-refundable.
- Date change (> 15 days before): possible subject to availability, no additional fees.
- Date change (< 15 days before): deposit retained and 50% penalty applies for reschedule.

These conditions help us maintain proper property management and protect blocked availability.`,
  };

  return messages[locale] || messages.en;
}
