import { z } from 'zod';

/**
 * Schema pour la validation du formulaire de réservation
 */
export const bookingCheckoutSchema = z.object({
  // Guest information
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),

  email: z
    .string()
    .email('Invalid email address'),

  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\+?[0-9\s\-()]+$/.test(val),
      'Invalid phone format'
    ),

  // Dates (ISO format: YYYY-MM-DD)
  checkInDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
    .refine((date) => !isNaN(new Date(date).getTime()), 'Invalid date'),

  checkOutDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format')
    .refine((date) => !isNaN(new Date(date).getTime()), 'Invalid date'),

  // Guests (max 4 for online booking, 5+ requires custom quote)
  guestCount: z
    .number()
    .int('Guest count must be whole number')
    .min(1, 'At least 1 guest required')
    .max(4, 'Online booking available for up to 4 guests. For 5+ guests, please contact us via WhatsApp or email.'),

  // Optional
  specialRequests: z
    .string()
    .max(500, 'Message must be less than 500 characters')
    .optional(),

  // Locale
  locale: z
    .enum(['fr', 'es', 'en'])
    .default('en'),

  // Security
  _hp: z.string().optional(),

  turnstileToken: z
    .string()
    .min(1, 'CAPTCHA verification required'),

  // Terms acceptance
  termsAccepted: z
    .boolean()
    .refine((val) => val === true, 'Terms must be accepted'),
});

export type BookingCheckoutFormInput = z.input<typeof bookingCheckoutSchema>;
export type BookingCheckoutRequest = z.output<typeof bookingCheckoutSchema>;

/**
 * Schema pour les dates de réservation seules (validation rapide)
 */
export const bookingDatesSchema = z.object({
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

/**
 * Schema pour la réponse d'API
 */
export const bookingCheckoutResponseSchema = z.object({
  ok: z.boolean(),
  url: z.string().url().optional(),
  error: z.string().optional(),
  bookingId: z.string().optional(),
});

export type BookingCheckoutResponse = z.infer<typeof bookingCheckoutResponseSchema>;
