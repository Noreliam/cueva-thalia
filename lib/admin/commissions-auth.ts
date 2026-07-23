import { createHmac, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';

export const COMMISSIONS_ADMIN_COOKIE = 'ct_admin_commissions';

const SESSION_SALT = 'cueva-thalia-commissions-admin-v1';

export function getCommissionsAdminPassword(): string | undefined {
  return process.env.ADMIN_COMMISSIONS_PASSWORD?.trim();
}

export function getCommissionsAdminSessionToken(): string | null {
  const password = getCommissionsAdminPassword();
  if (!password) {
    return null;
  }

  return createHmac('sha256', password).update(SESSION_SALT).digest('hex');
}

export function isCommissionsAdminAuthenticated(cookieValue: string | undefined): boolean {
  const expected = getCommissionsAdminSessionToken();
  if (!expected || !cookieValue) {
    return false;
  }

  try {
    const received = Buffer.from(cookieValue);
    const token = Buffer.from(expected);
    if (received.length !== token.length) {
      return false;
    }
    return timingSafeEqual(received, token);
  } catch {
    return false;
  }
}

export async function isCommissionsAdminRequestAuthenticated(
  request: Request,
): Promise<boolean> {
  const cookieHeader = request.headers.get('cookie') ?? '';
  const match = cookieHeader
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${COMMISSIONS_ADMIN_COOKIE}=`));

  if (!match) {
    return false;
  }

  const value = decodeURIComponent(match.slice(COMMISSIONS_ADMIN_COOKIE.length + 1));
  return isCommissionsAdminAuthenticated(value);
}

export async function isCommissionsAdminSessionActive(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COMMISSIONS_ADMIN_COOKIE);
  return isCommissionsAdminAuthenticated(session?.value);
}
