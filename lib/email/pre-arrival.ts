import type { BookingOrder } from '@/lib/booking/fulfill';
import { CHECK_IN_TIME, PRE_ARRIVAL_MAX_HOURS, PRE_ARRIVAL_MIN_HOURS } from '@/lib/booking/stay-info';
import { normalizeBookingLocale } from '@/lib/email/booking-locale';
import { buildPreArrivalTemplate } from '@/lib/email/pre-arrival-content';
import { getSmtpConfig, sendViaSmtp, shouldSendEmailInProduction } from '@/lib/email/smtp';

export type PreArrivalSendResult = {
  sent: boolean;
  skipped?: 'smtp' | 'email' | 'dev';
};

export async function sendPreArrivalEmail(order: BookingOrder): Promise<PreArrivalSendResult> {
  const smtp = getSmtpConfig();

  if (!smtp) {
    console.warn('[EMAIL:pre-arrival] SMTP not configured — skipping', { bookingId: order.bookingId });
    return { sent: false, skipped: 'smtp' };
  }

  if (!order.guestEmail) {
    console.warn('[EMAIL:pre-arrival] guest email missing — skipping', { bookingId: order.bookingId });
    return { sent: false, skipped: 'email' };
  }

  const locale = normalizeBookingLocale(order.locale);
  const { subject, html } = buildPreArrivalTemplate(locale);

  if (!shouldSendEmailInProduction()) {
    console.log('[EMAIL:pre-arrival] dev mode — email not sent', {
      bookingId: order.bookingId,
      to: order.guestEmail,
      locale,
      subject,
    });
    return { sent: false, skipped: 'dev' };
  }

  await sendViaSmtp({
    user: smtp.user,
    pass: smtp.pass,
    from: smtp.from,
    to: order.guestEmail,
    replyTo: smtp.replyTo,
    subject,
    html,
  });

  console.log('[EMAIL:pre-arrival] email sent', {
    bookingId: order.bookingId,
    to: order.guestEmail,
    locale,
    checkInDate: order.checkInDate,
  });

  return { sent: true };
}

/**
 * Fenêtre d'envoi : environ 48 h avant l'arrivée, avec rattrapage jusqu'à 6 h avant.
 * (L'ancienne fenêtre de 4 h seulement faisait rater l'envoi si le cron manquait ce créneau.)
 */
export function isWithinPreArrivalWindow(checkInDate: string, now = new Date()): boolean {
  const hoursUntilCheckIn = hoursUntilCheckInStart(checkInDate, now);
  if (hoursUntilCheckIn == null) {
    return false;
  }

  return hoursUntilCheckIn <= PRE_ARRIVAL_MAX_HOURS && hoursUntilCheckIn >= PRE_ARRIVAL_MIN_HOURS;
}

export function hoursUntilCheckInStart(checkInDate: string, now = new Date()): number | null {
  const [year, month, day] = checkInDate.split('-').map(Number);
  if (!year || !month || !day) {
    return null;
  }

  const checkIn = Date.parse(`${checkInDate}T${CHECK_IN_TIME}:00+00:00`);
  if (Number.isNaN(checkIn)) {
    return null;
  }

  return (checkIn - now.getTime()) / (1000 * 60 * 60);
}
