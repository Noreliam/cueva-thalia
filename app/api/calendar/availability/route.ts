import { NextResponse } from 'next/server';
import { getBlockedRanges, isCalendarConfigured } from '@/lib/booking/blocked-ranges';

export const runtime = 'nodejs';

/**
 * GET /api/calendar/availability
 * Retourne les plages bloquées (Smoobu export iCal + réservations site Stripe).
 */
export async function GET() {
  if (!isCalendarConfigured()) {
    return NextResponse.json(
      { configured: false, blocked: [] as { start: string; end: string }[] },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  }

  try {
    const blocked = await getBlockedRanges();
    return NextResponse.json(
      { configured: true, blocked },
      { headers: { 'Cache-Control': 'public, max-age=300, s-maxage=300' } },
    );
  } catch (error) {
    console.error('[CALENDAR:availability] failed', error);
    return NextResponse.json({ error: 'Availability unavailable' }, { status: 500 });
  }
}
