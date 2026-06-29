import type Stripe from 'stripe';
import { sendBookingConfirmation } from '@/lib/email/booking-confirmation';
import { sendBookingNotificationToManon } from '@/lib/email/booking-notification-admin';
import { getOnlineCheckInLink } from '@/lib/smoobu/placeholders';
import { createSmoobuReservation } from '@/lib/smoobu/reservations';

export type BookingOrder = {
  bookingId: string;
  stripeSessionId: string;
  paymentIntentId: string | null;
  amountCents: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string | null;
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
  specialRequests: string | null;
  locale: string;
  paidAt: string;
  smoobuReservationId?: number | null;
  onlineCheckInUrl?: string | null;
};

export function orderFromBookingCheckoutSession(
  session: Stripe.Checkout.Session,
): BookingOrder | null {
  const meta = session.metadata;
  if (!meta?.bookingId || session.payment_status !== 'paid') {
    return null;
  }

  const amountCents = session.amount_total ?? Number(meta.amountCents);
  if (!amountCents || amountCents < 1) {
    return null;
  }

  const guestCount = Number(meta.guestCount);
  if (!guestCount || guestCount < 1) {
    return null;
  }

  return {
    bookingId: meta.bookingId,
    stripeSessionId: session.id,
    paymentIntentId:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? null,
    amountCents,
    guestName: meta.guestName || '',
    guestEmail: session.customer_email || meta.guestEmail || '',
    guestPhone: meta.guestPhone?.trim() ? meta.guestPhone : null,
    checkInDate: meta.checkInDate || '',
    checkOutDate: meta.checkOutDate || '',
    guestCount,
    specialRequests: meta.specialRequests?.trim() ? meta.specialRequests : null,
    locale: meta.locale || 'es',
    paidAt: new Date((session.created || Date.now() / 1000) * 1000).toISOString(),
  };
}

/**
 * Post-payment hook: Smoobu sync, confirmation email, Supabase — à compléter.
 */
export async function fulfillBookingOrder(order: BookingOrder): Promise<void> {
  let smoobuReservationId: number | null = null;

  try {
    smoobuReservationId = await createSmoobuReservation(order);
  } catch (error) {
    console.error('[STRIPE:booking] Smoobu sync failed after payment', {
      bookingId: order.bookingId,
      error,
    });
  }

  let onlineCheckInUrl: string | null = null;
  if (smoobuReservationId) {
    try {
      onlineCheckInUrl = await getOnlineCheckInLink(smoobuReservationId, order.locale);
    } catch (error) {
      console.error('[STRIPE:booking] Smoobu online check-in link fetch failed', {
        bookingId: order.bookingId,
        smoobuReservationId,
        error,
      });
    }
  }

  const enrichedOrder = {
    ...order,
    smoobuReservationId,
    onlineCheckInUrl,
  };

  try {
    await sendBookingConfirmation(enrichedOrder);
  } catch (error) {
    console.error('[EMAIL:booking] confirmation email failed', {
      bookingId: order.bookingId,
      error,
    });
  }

  try {
    await sendBookingNotificationToManon(enrichedOrder);
  } catch (error) {
    console.error('[EMAIL:admin] notification email failed', {
      bookingId: order.bookingId,
      error,
    });
  }

  console.log('[STRIPE:booking] payment confirmed', {
    bookingId: order.bookingId,
    stripeSessionId: order.stripeSessionId,
    smoobuReservationId,
    checkInDate: order.checkInDate,
    checkOutDate: order.checkOutDate,
    guestCount: order.guestCount,
    amountCents: order.amountCents,
    locale: order.locale,
    hasSpecialRequests: Boolean(order.specialRequests),
    smoobuSync: smoobuReservationId
      ? 'api'
      : process.env.BOOKING_ICAL_SECRET
        ? 'ical-feed'
        : 'manual',
  });
}
