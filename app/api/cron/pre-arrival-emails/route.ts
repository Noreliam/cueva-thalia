import { NextResponse } from 'next/server';
import { runPreArrivalEmailCron } from '@/lib/email/pre-arrival-cron';

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return process.env.NODE_ENV !== 'production';
  }

  const auth = request.headers.get('authorization');
  return auth === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  const result = await runPreArrivalEmailCron();

  console.log('[CRON:pre-arrival] completed', result);

  return NextResponse.json({ ok: true, ...result });
}
