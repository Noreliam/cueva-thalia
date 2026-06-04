import { z } from 'zod';
import { routing } from '@/i18n/routing';

export const giftVoucherCheckoutSchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    phone: z.string().trim().max(30).optional(),
    giftType: z.enum(['1_nuit', '1_nuit_we', '2_nuits', 'custom']),
    customAmountEuros: z.coerce.number().positive().optional(),
    recipientName: z.string().trim().min(2).max(120),
    message: z.string().trim().max(2000).optional(),
    locale: z.enum(routing.locales),
    _hp: z.string().optional(),
    turnstileToken: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.giftType === 'custom' && data.customAmountEuros === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['customAmountEuros'],
        message: 'Custom amount required',
      });
    }
  });

export type GiftVoucherCheckoutInput = z.infer<typeof giftVoucherCheckoutSchema>;
