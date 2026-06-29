/**
 * Politique d'annulation et de modification des réservations — Cueva Thalía
 */

export interface CancellationPolicyResult {
  daysBeforeArrival: number;
  policy: 'full-refund' | 'partial-refund' | 'no-refund' | 'date-change-free' | 'date-change-fee' | 'date-change-denied';
  refundPercent: number;
  adminFeeEur: number;
  description: string;
}

export type CancellationSection = {
  title: string;
  items: string[];
};

export type CancellationPolicyContent = {
  title: string;
  intro: string;
  sections: CancellationSection[];
};

export function calculateCancellationPolicy(
  checkInDate: Date | string,
  requestDate: Date = new Date(),
): CancellationPolicyResult {
  const checkIn = typeof checkInDate === 'string' ? new Date(checkInDate) : new Date(checkInDate);
  const request = typeof requestDate === 'string' ? new Date(requestDate) : new Date(requestDate);

  checkIn.setHours(0, 0, 0, 0);
  request.setHours(0, 0, 0, 0);

  const daysBeforeArrival = Math.ceil((checkIn.getTime() - request.getTime()) / (1000 * 60 * 60 * 24));

  if (daysBeforeArrival > 14) {
    return {
      daysBeforeArrival,
      policy: 'full-refund',
      refundPercent: 100,
      adminFeeEur: 0,
      description: 'Cancellation more than 14 days before arrival: full refund.',
    };
  }

  if (daysBeforeArrival >= 7) {
    return {
      daysBeforeArrival,
      policy: 'partial-refund',
      refundPercent: 50,
      adminFeeEur: 0,
      description: 'Cancellation 7–14 days before arrival: 50% charge on total booking amount.',
    };
  }

  return {
    daysBeforeArrival,
    policy: 'no-refund',
    refundPercent: 0,
    adminFeeEur: 0,
    description: 'Cancellation less than 7 days before arrival, no-show or early departure: no refund.',
  };
}

export function calculateDateChangePolicy(
  checkInDate: Date | string,
  requestDate: Date = new Date(),
): CancellationPolicyResult {
  const checkIn = typeof checkInDate === 'string' ? new Date(checkInDate) : new Date(checkInDate);
  const request = typeof requestDate === 'string' ? new Date(requestDate) : new Date(requestDate);

  checkIn.setHours(0, 0, 0, 0);
  request.setHours(0, 0, 0, 0);

  const daysBeforeArrival = Math.ceil((checkIn.getTime() - request.getTime()) / (1000 * 60 * 60 * 24));

  if (daysBeforeArrival > 14) {
    return {
      daysBeforeArrival,
      policy: 'date-change-free',
      refundPercent: 0,
      adminFeeEur: 0,
      description: 'Date change more than 14 days before arrival: free, subject to availability.',
    };
  }

  if (daysBeforeArrival >= 7) {
    return {
      daysBeforeArrival,
      policy: 'date-change-fee',
      refundPercent: 0,
      adminFeeEur: 50,
      description: 'Date change 7–14 days before arrival: possible exceptionally with €50 admin fee.',
    };
  }

  return {
    daysBeforeArrival,
    policy: 'date-change-denied',
    refundPercent: 0,
    adminFeeEur: 0,
    description: 'Date change less than 7 days before arrival: not accepted.',
  };
}

export function getCancellationPolicyContent(locale: 'fr' | 'es' | 'en' = 'es'): CancellationPolicyContent {
  const content: Record<'fr' | 'es' | 'en', CancellationPolicyContent> = {
    es: {
      title: 'Política de cancelación y modificación de reservas – Cueva Thalía',
      intro:
        'Con el fin de garantizar una correcta organización de las reservas, se aplicarán las siguientes condiciones:',
      sections: [
        {
          title: 'Cancelaciones',
          items: [
            'Las cancelaciones realizadas con más de 14 días de antelación a la fecha de llegada darán derecho al reembolso íntegro de las cantidades abonadas.',
            'Las cancelaciones realizadas entre 14 días y 7 días antes de la llegada supondrán un cargo del 50 % del importe total de la reserva.',
            'Las cancelaciones realizadas con menos de 7 días de antelación, así como la no presentación (no show) o la salida anticipada, no darán derecho a reembolso.',
          ],
        },
        {
          title: 'Cambios de fecha',
          items: [
            'Las solicitudes de cambio de fecha realizadas con más de 14 días de antelación podrán realizarse sin coste, sujetas siempre a disponibilidad.',
            'Entre 14 y 7 días antes de la llegada, el cambio podrá aceptarse de forma excepcional, sujeto a disponibilidad, aplicándose un cargo administrativo de 50 €.',
            'Con menos de 7 días de antelación, no se aceptarán cambios de fecha.',
          ],
        },
        {
          title: 'Reservas reprogramadas',
          items: [
            'Una reserva modificada podrá cambiarse una única vez. La nueva fecha deberá disfrutarse dentro de los 12 meses siguientes a la reserva original y no será nuevamente modificable ni reembolsable.',
          ],
        },
        {
          title: 'Eventos y grupos',
          items: [
            'Para reservas de grupos, eventos, retiros o celebraciones privadas podrán aplicarse condiciones específicas de cancelación y una fianza diferente, que serán comunicadas y aceptadas en el momento de la reserva.',
          ],
        },
        {
          title: 'Fuerza mayor',
          items: [
            'En caso de circunstancias excepcionales que impidan objetivamente la prestación del alojamiento (catástrofes naturales, órdenes administrativas, etc.), Cueva Thalía podrá ofrecer un cambio de fechas o el reembolso correspondiente, según el caso.',
          ],
        },
      ],
    },
    fr: {
      title: 'Politique d\'annulation et de modification des réservations – Cueva Thalía',
      intro:
        'Afin de garantir une bonne organisation des réservations, les conditions suivantes s\'appliquent :',
      sections: [
        {
          title: 'Annulations',
          items: [
            'Les annulations effectuées plus de 14 jours avant la date d\'arrivée donnent droit au remboursement intégral des sommes versées.',
            'Les annulations effectuées entre 14 et 7 jours avant l\'arrivée entraînent une retenue de 50 % du montant total de la réservation.',
            'Les annulations effectuées moins de 7 jours avant l\'arrivée, ainsi que la non-présentation (no show) ou un départ anticipé, ne donnent droit à aucun remboursement.',
          ],
        },
        {
          title: 'Changements de date',
          items: [
            'Les demandes de changement de date effectuées plus de 14 jours à l\'avance peuvent être acceptées sans frais, sous réserve de disponibilité.',
            'Entre 14 et 7 jours avant l\'arrivée, le changement peut être accepté exceptionnellement, sous réserve de disponibilité, moyennant des frais administratifs de 50 €.',
            'Moins de 7 jours avant l\'arrivée, aucun changement de date n\'est accepté.',
          ],
        },
        {
          title: 'Réservations reprogrammées',
          items: [
            'Une réservation modifiée ne peut être changée qu\'une seule fois. La nouvelle date doit être utilisée dans les 12 mois suivant la réservation originale et ne pourra plus être modifiée ni remboursée.',
          ],
        },
        {
          title: 'Événements et groupes',
          items: [
            'Pour les réservations de groupes, événements, retraites ou célébrations privées, des conditions d\'annulation spécifiques et une caution différente peuvent s\'appliquer. Elles seront communiquées et acceptées au moment de la réservation.',
          ],
        },
        {
          title: 'Force majeure',
          items: [
            'En cas de circonstances exceptionnelles empêchant objectivement la prestation de l\'hébergement (catastrophes naturelles, ordres administratifs, etc.), Cueva Thalía pourra proposer un changement de dates ou le remboursement correspondant, selon le cas.',
          ],
        },
      ],
    },
    en: {
      title: 'Cancellation and modification policy – Cueva Thalía',
      intro:
        'To ensure proper booking management, the following conditions apply:',
      sections: [
        {
          title: 'Cancellations',
          items: [
            'Cancellations made more than 14 days before arrival are eligible for a full refund of amounts paid.',
            'Cancellations made between 14 and 7 days before arrival incur a 50% charge on the total booking amount.',
            'Cancellations made less than 7 days before arrival, no-shows or early departures are not eligible for a refund.',
          ],
        },
        {
          title: 'Date changes',
          items: [
            'Date change requests made more than 14 days in advance may be accepted at no cost, subject to availability.',
            'Between 14 and 7 days before arrival, changes may be accepted exceptionally, subject to availability, with a €50 administrative fee.',
            'Less than 7 days before arrival, no date changes are accepted.',
          ],
        },
        {
          title: 'Rescheduled bookings',
          items: [
            'A modified booking may only be changed once. The new date must be used within 12 months of the original booking and cannot be modified or refunded again.',
          ],
        },
        {
          title: 'Events and groups',
          items: [
            'For group bookings, events, retreats or private celebrations, specific cancellation terms and a different security deposit may apply. These will be communicated and accepted at the time of booking.',
          ],
        },
        {
          title: 'Force majeure',
          items: [
            'In exceptional circumstances that objectively prevent the provision of accommodation (natural disasters, administrative orders, etc.), Cueva Thalía may offer a date change or the corresponding refund, as appropriate.',
          ],
        },
      ],
    },
  };

  return content[locale] || content.es;
}

/** @deprecated Use getCancellationPolicyContent instead */
export function getCancellationMessage(locale: 'fr' | 'es' | 'en' = 'es'): string {
  const policy = getCancellationPolicyContent(locale);
  return [policy.title, policy.intro, ...policy.sections.flatMap((s) => [s.title, ...s.items])].join('\n\n');
}

export const BOOKING_RULES = {
  deposit: {
    amount: 150,
    description: 'Security deposit required on arrival',
  },
  cancellation: {
    fullRefundDays: 14,
    partialRefundDays: 7,
    partialRefundPercent: 50,
    dateChangeAdminFee: 50,
  },
  guests: {
    minGuests: 1,
    maxGuestsOnline: 4,
    maxGuestsTotal: 16,
  },
};
