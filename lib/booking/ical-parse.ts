export type DateRange = {
  start: string;
  end: string;
};

function icalDateToIso(raw: string): string {
  if (raw.length === 8) {
    return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
  }
  return raw.slice(0, 10);
}

export function parseIcalBlockedRanges(ics: string): DateRange[] {
  const ranges: DateRange[] = [];
  const blocks = ics.split('BEGIN:VEVENT');

  for (const block of blocks.slice(1)) {
    const startRaw = block.match(/DTSTART(?:;VALUE=DATE)?:(\d{8}|\d{4}-\d{2}-\d{2})/)?.[1];
    const endRaw = block.match(/DTEND(?:;VALUE=DATE)?:(\d{8}|\d{4}-\d{2}-\d{2})/)?.[1];
    if (!startRaw || !endRaw) continue;
    ranges.push({
      start: icalDateToIso(startRaw),
      end: icalDateToIso(endRaw),
    });
  }

  return ranges;
}
