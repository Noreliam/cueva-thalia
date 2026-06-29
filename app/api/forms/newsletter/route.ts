import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendNewsletterWelcomeEmail } from '@/lib/email/newsletter-welcome';
import { handleFormSubmission } from '@/lib/security/form-handler';

const newsletterSchema = z.object({
  email: z.string().email().max(254),
  locale: z.enum(['fr', 'es', 'en']).default('es'),
  gdprAccepted: z.literal(true),
  turnstileToken: z.string().optional(),
  _hp: z.string().optional(),
});

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    formType: 'newsletter',
    schema: newsletterSchema,
    handler: async (data) => {
      await sendNewsletterWelcomeEmail(data.email, data.locale);
      console.log('[FORM:newsletter] subscription', {
        email: data.email,
        locale: data.locale,
      });
    },
  });
}
