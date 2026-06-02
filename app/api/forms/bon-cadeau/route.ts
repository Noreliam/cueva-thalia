import { NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  giftType: z.string(),
  recipientName: z.string(),
  message: z.string(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = schema.parse(body);
    
    console.log('[FORM:bon-cadeau]', parsed);
    // TODO webdev: brancher Supabase + e-mail transactionnel + webhook dashboard
    
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[FORM:bon-cadeau] Error:', error);
    return NextResponse.json({ ok: false, error: 'Invalid data' }, { status: 400 });
  }
}
