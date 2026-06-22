import { listConfirmedBookingOrders } from '@/lib/booking/stripe-bookings';
import { parseIcalBlockedRanges, type DateRange } from '@/lib/booking/ical-parse';
import { isStayAvailable } from '@/lib/booking/dates';

let cache: { fetchedAt: number; ranges: DateRange[] } | null = null;
const CACHE_MS = 5 * 60 * 1000;

function getSmoobuExportUrl(): string | undefined {
  return process.env.SMOOBU_ICAL_EXPORT_URL?.trim();
}

async function fetchSmoobuBlockedRanges(): Promise<DateRange[]> {
  const url = getSmoobuExportUrl();
  if (!url) return [];

  const response = await fetch(url, {
    headers: { 'Cache-Control': 'no-cache' },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Smoobu iCal export failed (${response.status})`);
  }

  return parseIcalBlockedRanges(await response.text());
}

async function fetchSiteBlockedRanges(): Promise<DateRange[]> {
  try {
    const bookings = await listConfirmedBookingOrders();
    return bookings.map((b) => ({ start: b.checkInDate, end: b.checkOutDate }));
  } catch {
    return [];
  }
}

export async function getBlockedRanges(forceRefresh = false): Promise<DateRange[]> {
  const now = Date.now();
  if (!forceRefresh && cache && now - cache.fetchedAt < CACHE_MS) {
    return cache.ranges;
  }

  const [smoobuRanges, siteRanges] = await Promise.all([
    fetchSmoobuBlockedRanges().catch((error) => {
      console.error('[CALENDAR] Smoobu iCal export error', error);
      return [] as DateRange[];
    }),
    fetchSiteBlockedRanges(),
  ]);

  const ranges = [...smoobuRanges, ...siteRanges];
  cache = { fetchedAt: now, ranges };
  return ranges;
}

export async function checkBookingDatesAvailable(
  checkIn: string,
  checkOut: string,
): Promise<{ available: true } | { available: false; reason: string }> {
  if (!getSmoobuExportUrl()) {
    console.warn('[CALENDAR] SMOOBU_ICAL_EXPORT_URL not configured — skipping availability check');
    return { available: true };
  }

  const ranges = await getBlockedRanges();
  return isStayAvailable(checkIn, checkOut, ranges);
}

export function isCalendarConfigured(): boolean {
  return Boolean(getSmoobuExportUrl());
}
