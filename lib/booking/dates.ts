export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function addDays(iso: string, days: number): string {
  const date = parseIsoDate(iso);
  date.setDate(date.getDate() + days);
  return formatIsoDate(date);
}

export function nightsInStay(checkIn: string, checkOut: string): string[] {
  const nights: string[] = [];
  let cursor = checkIn;
  while (cursor < checkOut) {
    nights.push(cursor);
    cursor = addDays(cursor, 1);
  }
  return nights;
}

export function todayIso(): string {
  return formatIsoDate(new Date());
}

/** iCal / hébergement : end est exclusif (nuits = [start, end)). */
export function rangeBlocksNight(range: { start: string; end: string }, night: string): boolean {
  return night >= range.start && night < range.end;
}

export function isStayAvailable(
  checkIn: string,
  checkOut: string,
  blockedRanges: { start: string; end: string }[],
): { available: true } | { available: false; reason: string } {
  if (checkOut <= checkIn) {
    return { available: false, reason: 'Invalid date range' };
  }

  if (checkIn < todayIso()) {
    return { available: false, reason: 'Check-in must be in the future' };
  }

  for (const night of nightsInStay(checkIn, checkOut)) {
    for (const range of blockedRanges) {
      if (rangeBlocksNight(range, night)) {
        return { available: false, reason: 'Dates not available' };
      }
    }
  }

  return { available: true };
}
