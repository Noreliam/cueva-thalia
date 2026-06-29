import overridesData from '@/data/pricing-overrides.json';

export type PricingPeriod = {
  id: string;
  label: string;
  startDate: string;
  endDate: string;
  peakDayRate?: number;
  offDayRate?: number;
  note?: string;
};

type PricingOverridesFile = {
  periods: PricingPeriod[];
};

const overrides = overridesData as PricingOverridesFile;

function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function isDateInPeriod(date: Date, period: PricingPeriod): boolean {
  const start = parseIsoDate(period.startDate);
  const end = parseIsoDate(period.endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  const current = new Date(date);
  current.setHours(12, 0, 0, 0);
  return current >= start && current <= end;
}

export function getActivePricingPeriod(date: Date): PricingPeriod | null {
  for (const period of overrides.periods) {
    if (isDateInPeriod(date, period)) {
      return period;
    }
  }
  return null;
}

export function getPricingOverrideRates(
  date: Date,
  defaultPeak: number,
  defaultOff: number,
): { peakDay: number; offDay: number; periodLabel?: string } {
  const period = getActivePricingPeriod(date);
  if (!period) {
    return { peakDay: defaultPeak, offDay: defaultOff };
  }

  return {
    peakDay: period.peakDayRate ?? defaultPeak,
    offDay: period.offDayRate ?? defaultOff,
    periodLabel: period.label,
  };
}

export function listPricingPeriods(): PricingPeriod[] {
  return overrides.periods;
}
