import { orderFromBookingCheckoutSession, type BookingOrder } from '@/lib/booking/fulfill';
import { getStripe, isStripeConfigured } from '@/lib/stripe/server';

const PAGE_SIZE = 100;
const MAX_PAGES = 10;

export async function listConfirmedBookingOrders(): Promise<BookingOrder[]> {
  if (!isStripeConfigured()) {
    return [];
  }

  const stripe = getStripe();
  const bookings: BookingOrder[] = [];
  const seen = new Set<string>();
  let startingAfter: string | undefined;

  for (let page = 0; page < MAX_PAGES; page += 1) {
    const sessions = await stripe.checkout.sessions.list({
      limit: PAGE_SIZE,
      status: 'complete',
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });

    for (const session of sessions.data) {
      const order = orderFromBookingCheckoutSession(session);
      if (!order || seen.has(order.bookingId)) {
        continue;
      }
      seen.add(order.bookingId);
      bookings.push(order);
    }

    if (!sessions.has_more || sessions.data.length === 0) {
      break;
    }
    startingAfter = sessions.data[sessions.data.length - 1]?.id;
    if (!startingAfter) {
      break;
    }
  }

  return bookings.sort((a, b) => a.checkInDate.localeCompare(b.checkInDate));
}
