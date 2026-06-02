import { NextResponse } from 'next/server';
import { z } from 'zod';
import { handleFormSubmission } from '@/lib/security/form-handler';

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(30).optional(),
  giftType: z.string().trim().min(2).max(80),
  recipientName: z.string().trim().min(2).max(120),
  message: z.string().trim().max(2000).optional(),
  _hp: z.string().optional(),
  turnstileToken: z.string().optional(),
});

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    formType: 'bon-cadeau',
    schema,
    handler: async (parsed) => {
      console.log('[FORM:bon-cadeau] received', {
        name: parsed.name,
        email: parsed.email,
        giftType: parsed.giftType,
        recipientName: parsed.recipientName,
      });
      // TODO webdev: brancher Supabase + e-mail transactionnel + webhook dashboard
    },
  });
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
