import type { BookingOrder } from '@/lib/booking/fulfill';

function escapeIcalText(value: string): string {
  return value.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}

function formatIcalDate(date: string): string {
  return date.replace(/-/g, '');
}

function formatIcalTimestamp(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return `${formatIcalDate(new Date().toISOString().slice(0, 10))}T000000Z`;
  }
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
}

function bookingToVevent(order: BookingOrder): string {
  const summary = escapeIcalText(`Cueva Thalia — ${order.guestName}`);
  const description = escapeIcalText(
    [
      `Booking ID: ${order.bookingId}`,
      `Email: ${order.guestEmail}`,
      order.guestPhone ? `Phone: ${order.guestPhone}` : null,
      `Guests: ${order.guestCount}`,
      `Stripe: ${order.stripeSessionId}`,
    ]
      .filter(Boolean)
      .join('\\n'),
  );

  return [
    'BEGIN:VEVENT',
    `UID:${order.bookingId}@cueva-thalia.com`,
    `DTSTAMP:${formatIcalTimestamp(order.paidAt)}`,
    `DTSTART;VALUE=DATE:${formatIcalDate(order.checkInDate)}`,
    `DTEND;VALUE=DATE:${formatIcalDate(order.checkOutDate)}`,
    `SUMMARY:${summary}`,
    `DESCRIPTION:${description}`,
    'STATUS:CONFIRMED',
    'TRANSP:OPAQUE',
    'END:VEVENT',
  ].join('\r\n');
}

export function buildBookingsIcalFeed(bookings: BookingOrder[]): string {
  const events = bookings.map(bookingToVevent).join('\r\n');
  const refreshed = formatIcalTimestamp(new Date().toISOString());

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Cueva Thalia//Booking Sync//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:Cueva Thalia — réservations directes',
    `REFRESH-INTERVAL;VALUE=DURATION:PT1H`,
    `X-PUBLISHED-TTL:PT1H`,
    events,
    'END:VCALENDAR',
    '',
  ].join('\r\n');
}
