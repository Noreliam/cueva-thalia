import { createHash, createHmac, randomUUID } from 'crypto';

const SMOOBU_API_BASE = 'https://login.smoobu.com';
const EMPTY_BODY_SHA256 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

let cachedCustomerId: number | null | undefined;

export function getSmoobuApiKey(): string | undefined {
  return process.env.SMOOBU_API_KEY?.trim();
}

export function getSmoobuApiSecret(): string | undefined {
  return process.env.SMOOBU_API_SECRET?.trim();
}

export function getSmoobuApartmentId(): number | undefined {
  const raw = process.env.SMOOBU_APARTMENT_ID?.trim();
  if (!raw) return undefined;
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : undefined;
}

export function getSmoobuChannelId(): number {
  const raw = process.env.SMOOBU_CHANNEL_ID?.trim();
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : 70;
}

export function getSmoobuCustomerId(): number | undefined {
  const raw = process.env.SMOOBU_CUSTOMER_ID?.trim();
  if (!raw) return undefined;
  const id = Number(raw);
  return Number.isFinite(id) && id > 0 ? id : undefined;
}

export function isSmoobuCalendarConfigured(): boolean {
  return Boolean(getSmoobuApartmentId() && process.env.NEXT_PUBLIC_SMOOBU_CALENDAR_VERIFICATION?.trim());
}

export function isSmoobuConfigured(): boolean {
  return Boolean(getSmoobuApiKey() && getSmoobuApartmentId());
}

export function isSmoobuAvailabilityConfigured(): boolean {
  return isSmoobuConfigured() && Boolean(getSmoobuCustomerId());
}

export function isSmoobuReservationSyncConfigured(): boolean {
  return isSmoobuConfigured() && process.env.SMOOBU_ENABLE_API_SYNC === 'true';
}

type SmoobuFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  /** Use HMAC signing when SMOOBU_API_SECRET is set (REST endpoints). */
  useHmac?: boolean;
};

type SmoobuMeResponse = {
  id?: number;
};

function sha256Hex(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

function buildHmacHeaders(
  method: string,
  path: string,
  queryString: string,
  body: string,
  apiKey: string,
  apiSecret: string,
): Record<string, string> {
  const timestamp = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
  const nonce = randomUUID();
  const bodyHash = body ? sha256Hex(body) : EMPTY_BODY_SHA256;
  const canonical = `${method}\n${path}\n${queryString}\n${timestamp}\n${nonce}\n${bodyHash}\n${apiKey}`;
  const signature = createHmac('sha256', apiSecret).update(canonical).digest('base64');

  return {
    'X-API-Key': apiKey,
    'X-Timestamp': timestamp,
    'X-Nonce': nonce,
    'X-Signature': signature,
  };
}

export async function resolveSmoobuCustomerId(): Promise<number | undefined> {
  const fromEnv = getSmoobuCustomerId();
  if (fromEnv) return fromEnv;

  if (cachedCustomerId !== undefined) {
    return cachedCustomerId ?? undefined;
  }

  const apiKey = getSmoobuApiKey();
  if (!apiKey) {
    cachedCustomerId = null;
    return undefined;
  }

  try {
    const me = await smoobuFetch<SmoobuMeResponse>('/api/me', { method: 'GET' });
    if (me.id && me.id > 0) {
      cachedCustomerId = me.id;
      return me.id;
    }
  } catch (error) {
    console.warn('[SMOOBU] unable to resolve customerId from /api/me', error);
  }

  cachedCustomerId = null;
  return undefined;
}

export async function smoobuFetch<T>(path: string, options: SmoobuFetchOptions = {}): Promise<T> {
  const apiKey = getSmoobuApiKey();
  if (!apiKey) {
    throw new Error('SMOOBU_API_KEY is not configured');
  }

  const method = options.method ?? 'GET';
  const body = options.body ? JSON.stringify(options.body) : '';
  const apiSecret = getSmoobuApiSecret();
  const useHmac = Boolean(options.useHmac && apiSecret);

  const headers: Record<string, string> = {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  };

  if (useHmac && apiSecret) {
    Object.assign(headers, buildHmacHeaders(method, path, '', body, apiKey, apiSecret));
  } else {
    headers['Api-Key'] = apiKey;
  }

  const response = await fetch(`${SMOOBU_API_BASE}${path}`, {
    method,
    headers,
    body: body || undefined,
    cache: 'no-store',
  });

  const data = (await response.json()) as T & { status?: number; title?: string; detail?: string };

  if (!response.ok) {
    const message = data.detail || data.title || `Smoobu API error (${response.status})`;
    throw new Error(message);
  }

  return data;
}
