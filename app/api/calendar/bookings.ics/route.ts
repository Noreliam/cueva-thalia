import { NextResponse } from 'next/server';
import { buildBookingsIcalFeed } from '@/lib/booking/ical';
import { listConfirmedBookingOrders } from '@/lib/booking/stripe-bookings';

export const runtime = 'nodejs';

function getIcalSecret(): string | undefined {
  return process.env.BOOKING_ICAL_SECRET?.trim();
}

function isAuthorized(request: Request): boolean {
  const secret = getIcalSecret();
  if (!secret) {
    return false;
  }

  const url = new URL(request.url);
  const token = url.searchParams.get('token')?.trim();
  if (token && token === secret) {
    return true;
  }

  const auth = request.headers.get('authorization')?.trim();
  if (auth === `Bearer ${secret}`) {
    return true;
  }

  return false;
}

/**
 * GET /api/calendar/bookings.ics?token=...
 *
 * Flux iCal pour Smoobu : importez cette URL comme canal iCal individuel
 * afin de bloquer automatiquement les dates réservées via cueva-thalia.com.
 */
export async function GET(request: Request) {
  if (!getIcalSecret()) {
    return NextResponse.json({ error: 'Calendar feed not configured' }, { status: 503 });
  }

  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await listConfirmedBookingOrders();
    const body = buildBookingsIcalFeed(bookings);

    return new NextResponse(body, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    });
  } catch (error) {
    console.error('[CALENDAR:bookings.ics] feed generation failed', error);
    return NextResponse.json({ error: 'Feed unavailable' }, { status: 500 });
  }
}
