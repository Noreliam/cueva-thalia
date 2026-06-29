import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sendNewsletterWelcomeEmail } from '@/lib/email/newsletter-welcome';
import { saveNewsletterSubscriber } from '@/lib/newsletter/subscribers';
import { handleFormSubmission } from '@/lib/security/form-handler';

const newsletterSchema = z.object({
  email: z.string().email().max(254),
  locale: z.enum(['fr', 'es', 'en']).default('es'),
  source: z.enum(['popup_welcome', 'popup_exit']).default('popup_welcome'),
  gdprAccepted: z.literal(true),
  turnstileToken: z.string().optional(),
  _hp: z.string().optional(),
});

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    formType: 'newsletter',
    schema: newsletterSchema,
    handler: async (data) => {
      try {
        const saved = await saveNewsletterSubscriber({
          email: data.email,
          locale: data.locale,
          source: data.source,
        });
        console.log('[FORM:newsletter] subscription', {
          email: data.email,
          locale: data.locale,
          source: data.source,
          persisted: saved,
        });
      } catch {
        console.error('[FORM:newsletter] db save failed — welcome email still sent');
      }

      await sendNewsletterWelcomeEmail(data.email, data.locale);
    },
  });
}
