import { isWithinPreArrivalWindow, sendPreArrivalEmail } from '@/lib/email/pre-arrival';
import { listConfirmedBookingOrders } from '@/lib/booking/stripe-bookings';
import { getStripe, isStripeConfigured } from '@/lib/stripe/server';

export type PreArrivalCronResult = {
  processed: number;
  sent: number;
  skipped: number;
  errors: number;
};

export async function runPreArrivalEmailCron(): Promise<PreArrivalCronResult> {
  const result: PreArrivalCronResult = { processed: 0, sent: 0, skipped: 0, errors: 0 };

  if (!isStripeConfigured()) {
    return result;
  }

  const bookings = await listConfirmedBookingOrders();
  const stripe = getStripe();
  const now = new Date();

  for (const order of bookings) {
    result.processed += 1;

    if (order.checkInDate <= now.toISOString().slice(0, 10)) {
      result.skipped += 1;
      continue;
    }

    if (!isWithinPreArrivalWindow(order.checkInDate, now)) {
      result.skipped += 1;
      continue;
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId);
      if (session.metadata?.preArrivalEmailSent === 'true') {
        result.skipped += 1;
        continue;
      }

      await sendPreArrivalEmail(order);

      await stripe.checkout.sessions.update(order.stripeSessionId, {
        metadata: {
          ...session.metadata,
          preArrivalEmailSent: 'true',
          preArrivalEmailSentAt: now.toISOString(),
        },
      });

      result.sent += 1;
    } catch (error) {
      result.errors += 1;
      console.error('[CRON:pre-arrival] failed for booking', {
        bookingId: order.bookingId,
        error,
      });
    }
  }

  return result;
}
