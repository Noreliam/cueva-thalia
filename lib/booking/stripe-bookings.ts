import { orderFromBookingCheckoutSession, type BookingOrder } from '@/lib/booking/fulfill';
import { getStripe, isStripeConfigured } from '@/lib/stripe/server';

const MAX_SESSIONS = 100;

export async function listConfirmedBookingOrders(): Promise<BookingOrder[]> {
  if (!isStripeConfigured()) {
    return [];
  }

  const stripe = getStripe();
  const sessions = await stripe.checkout.sessions.list({
    limit: MAX_SESSIONS,
    status: 'complete',
  });

  const bookings: BookingOrder[] = [];
  const seen = new Set<string>();

  for (const session of sessions.data) {
    const order = orderFromBookingCheckoutSession(session);
    if (!order || seen.has(order.bookingId)) {
      continue;
    }
    seen.add(order.bookingId);
    bookings.push(order);
  }

  return bookings.sort((a, b) => a.checkInDate.localeCompare(b.checkInDate));
}
