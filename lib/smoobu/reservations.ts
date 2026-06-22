import type { BookingOrder } from '@/lib/booking/fulfill';
import {
  getSmoobuApartmentId,
  getSmoobuChannelId,
  getSmoobuApiSecret,
  isSmoobuConfigured,
  smoobuFetch,
} from '@/lib/smoobu/client';

type CreateReservationResponse = {
  id?: number;
};

function splitGuestName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return { firstName: 'Guest', lastName: 'Cueva Thalia' };
  }
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '-' };
  }
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(' '),
  };
}

export async function createSmoobuReservation(order: BookingOrder): Promise<number | null> {
  if (process.env.SMOOBU_ENABLE_API_SYNC !== 'true') {
    return null;
  }

  if (!isSmoobuConfigured()) {
    console.warn('[SMOOBU] reservation sync skipped — API not configured');
    return null;
  }

  if (!getSmoobuApiSecret()) {
    console.warn(
      '[SMOOBU] reservation sync skipped — add SMOOBU_API_SECRET from Smoobu → Paramètres avancés → Clés API',
    );
    return null;
  }

  const apartmentId = getSmoobuApartmentId()!;
  const { firstName, lastName } = splitGuestName(order.guestName);
  const amountEuros = order.amountCents / 100;

  const result = await smoobuFetch<CreateReservationResponse>('/api/reservations', {
    method: 'POST',
    useHmac: true,
    body: {
      arrivalDate: order.checkInDate,
      departureDate: order.checkOutDate,
      apartmentId,
      channelId: getSmoobuChannelId(),
      firstName,
      lastName,
      email: order.guestEmail,
      phone: order.guestPhone || '-',
      adults: order.guestCount,
      children: 0,
      price: amountEuros,
      priceStatus: 1,
      notice: [
        `Réservation site cueva-thalia.com`,
        `Booking ID: ${order.bookingId}`,
        `Stripe session: ${order.stripeSessionId}`,
        order.specialRequests ? `Demandes: ${order.specialRequests}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
      language: order.locale,
    },
  });

  return result.id ?? null;
}
