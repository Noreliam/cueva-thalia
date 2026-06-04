export type GiftVoucherType = '1_nuit' | '1_nuit_we' | '2_nuits' | 'custom';

const DEFAULT_AMOUNTS_CENTS: Record<Exclude<GiftVoucherType, 'custom'>, number> = {
  '1_nuit': 20_000,
  '1_nuit_we': 25_000,
  '2_nuits': 40_000,
};

function readEnvCents(name: string, fallback: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export function getGiftCustomMinCents(): number {
  return readEnvCents('STRIPE_GIFT_CUSTOM_MIN_CENTS', 5_000);
}

export function getGiftCustomMaxCents(): number {
  return readEnvCents('STRIPE_GIFT_CUSTOM_MAX_CENTS', 200_000);
}

export function getFixedGiftAmountCents(giftType: Exclude<GiftVoucherType, 'custom'>): number {
  const envKey = {
    '1_nuit': 'STRIPE_GIFT_AMOUNT_1_NUIT_CENTS',
    '1_nuit_we': 'STRIPE_GIFT_AMOUNT_1_NUIT_WE_CENTS',
    '2_nuits': 'STRIPE_GIFT_AMOUNT_2_NUITS_CENTS',
  }[giftType] as string;
  return readEnvCents(envKey, DEFAULT_AMOUNTS_CENTS[giftType]);
}

export function resolveGiftAmountCents(
  giftType: GiftVoucherType,
  customAmountEuros?: number,
): { ok: true; amountCents: number } | { ok: false; error: 'invalid_custom' | 'unknown_type' } {
  if (giftType === 'custom') {
    if (customAmountEuros === undefined || !Number.isFinite(customAmountEuros)) {
      return { ok: false, error: 'invalid_custom' };
    }
    const amountCents = Math.round(customAmountEuros * 100);
    const min = getGiftCustomMinCents();
    const max = getGiftCustomMaxCents();
    if (amountCents < min || amountCents > max) {
      return { ok: false, error: 'invalid_custom' };
    }
    return { ok: true, amountCents };
  }

  if (!(giftType in DEFAULT_AMOUNTS_CENTS)) {
    return { ok: false, error: 'unknown_type' };
  }

  return { ok: true, amountCents: getFixedGiftAmountCents(giftType) };
}

const PRODUCT_NAMES: Record<string, Record<GiftVoucherType, string>> = {
  fr: {
    '1_nuit': 'Bon cadeau — 1 nuit (semaine)',
    '1_nuit_we': 'Bon cadeau — 1 nuit (week-end)',
    '2_nuits': 'Bon cadeau — 2 nuits',
    custom: 'Bon cadeau — montant personnalisé',
  },
  es: {
    '1_nuit': 'Bono regalo — 1 noche (entre semana)',
    '1_nuit_we': 'Bono regalo — 1 noche (fin de semana)',
    '2_nuits': 'Bono regalo — 2 noches',
    custom: 'Bono regalo — importe personalizado',
  },
  en: {
    '1_nuit': 'Gift voucher — 1 night (weekday)',
    '1_nuit_we': 'Gift voucher — 1 night (weekend)',
    '2_nuits': 'Gift voucher — 2 nights',
    custom: 'Gift voucher — custom amount',
  },
};

export function getGiftProductName(locale: string, giftType: GiftVoucherType): string {
  const names = PRODUCT_NAMES[locale] ?? PRODUCT_NAMES.es;
  return names[giftType];
}
