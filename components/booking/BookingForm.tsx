'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingCheckoutSchema, type BookingCheckoutFormInput } from '@/lib/booking/schema';

interface BookingFormProps {
  onSuccess?: (bookingId: string, sessionId: string) => void;
  locale?: 'fr' | 'es' | 'en';
}

export default function BookingForm({ onSuccess, locale = 'en' }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingCheckoutFormInput>({
    resolver: zodResolver(bookingCheckoutSchema),
    defaultValues: {
      locale,
      guestCount: 2,
      termsAccepted: false,
    },
  });

  const guestCount = watch('guestCount');
  const termsAccepted = watch('termsAccepted');

  const onSubmit = async (data: BookingCheckoutFormInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // Get Turnstile token
      // @ts-expect-error - Turnstile is loaded globally
      const turnstileToken = await window.turnstile?.render('#turnstile', {
        sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      });

      if (!turnstileToken) {
        throw new Error('CAPTCHA verification failed');
      }

      data.turnstileToken = turnstileToken;

      // Create checkout session
      const response = await fetch('/api/stripe/booking/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.ok) {
        throw new Error(result.error || 'Checkout failed');
      }

      // Redirect to Stripe Checkout
      if (result.url) {
        window.location.href = result.url;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      setIsLoading(false);
    }
  };

  const labels = {
    fr: {
      title: 'Réserver',
      name: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone (optionnel)',
      checkIn: 'Date d\'arrivée',
      checkOut: 'Date de départ',
      guests: 'Nombre d\'invités',
      requests: 'Demandes spéciales',
      terms: 'J\'accepte les conditions générales',
      submit: 'Procéder au paiement',
      processing: 'Traitement...',
    },
    es: {
      title: 'Reservar',
      name: 'Nombre completo',
      email: 'Email',
      phone: 'Teléfono (opcional)',
      checkIn: 'Fecha de llegada',
      checkOut: 'Fecha de salida',
      guests: 'Número de huéspedes',
      requests: 'Solicitudes especiales',
      terms: 'Acepto los términos y condiciones',
      submit: 'Proceder al pago',
      processing: 'Procesando...',
    },
    en: {
      title: 'Book',
      name: 'Full name',
      email: 'Email',
      phone: 'Phone (optional)',
      checkIn: 'Check-in date',
      checkOut: 'Check-out date',
      guests: 'Number of guests',
      requests: 'Special requests',
      terms: 'I accept the terms and conditions',
      submit: 'Proceed to payment',
      processing: 'Processing...',
    },
  };

  const t = labels[locale] || labels.en;

  return (
    <div className="booking-form-container">
      <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
        {error && (
          <div className="form-error-message" role="alert">
            {error}
          </div>
        )}

        {/* Guest Information */}
        <fieldset className="form-fieldset">
          <legend className="form-fieldset-title">{t.title}</legend>

          <div className="form-group">
            <label htmlFor="name">{t.name}</label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              {...register('name')}
              disabled={isLoading}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <span id="name-error" className="form-error">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t.email}</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              disabled={isLoading}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <span id="email-error" className="form-error">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t.phone}</label>
            <input
              id="phone"
              type="tel"
              placeholder="+34 123 456 789"
              {...register('phone')}
              disabled={isLoading}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
            />
            {errors.phone && <span id="phone-error" className="form-error">{errors.phone.message}</span>}
          </div>
        </fieldset>

        {/* Dates */}
        <fieldset className="form-fieldset">
          <legend className="form-fieldset-title">Dates</legend>

          <div className="form-group">
            <label htmlFor="checkInDate">{t.checkIn}</label>
            <input
              id="checkInDate"
              type="date"
              {...register('checkInDate')}
              disabled={isLoading}
              aria-describedby={errors.checkInDate ? 'checkInDate-error' : undefined}
            />
            {errors.checkInDate && (
              <span id="checkInDate-error" className="form-error">
                {errors.checkInDate.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="checkOutDate">{t.checkOut}</label>
            <input
              id="checkOutDate"
              type="date"
              {...register('checkOutDate')}
              disabled={isLoading}
              aria-describedby={errors.checkOutDate ? 'checkOutDate-error' : undefined}
            />
            {errors.checkOutDate && (
              <span id="checkOutDate-error" className="form-error">
                {errors.checkOutDate.message}
              </span>
            )}
          </div>
        </fieldset>

        {/* Guests */}
        <fieldset className="form-fieldset">
          <legend className="form-fieldset-title">{t.guests}</legend>

          <div className="form-group">
            <label htmlFor="guestCount">{t.guests}</label>
            <select {...register('guestCount', { valueAsNumber: true })} disabled={isLoading}>
              {Array.from({ length: 4 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n} guest{n > 1 ? 's' : ''}
                </option>
              ))}
            </select>
            <p className="form-help-text">Maximum 4 guests for online booking. For 5+ guests, please contact us via WhatsApp or email.</p>
          </div>
        </fieldset>

        {/* Special Requests */}
        <fieldset className="form-fieldset">
          <legend className="form-fieldset-title">Additional</legend>

          <div className="form-group">
            <label htmlFor="specialRequests">{t.requests}</label>
            <textarea
              id="specialRequests"
              placeholder="Any special requests or preferences..."
              rows={4}
              {...register('specialRequests')}
              disabled={isLoading}
              aria-describedby={errors.specialRequests ? 'specialRequests-error' : undefined}
            />
            {errors.specialRequests && (
              <span id="specialRequests-error" className="form-error">
                {errors.specialRequests.message}
              </span>
            )}
          </div>
        </fieldset>

        {/* Honeypot */}
        <input type="hidden" {...register('_hp')} />

        {/* Security */}
        <div id="turnstile" className="turnstile-container" />

        {/* Terms */}
        <div className="form-group form-group--checkbox">
          <label htmlFor="termsAccepted" className="checkbox-label">
            <input
              id="termsAccepted"
              type="checkbox"
              {...register('termsAccepted')}
              disabled={isLoading}
              aria-describedby={errors.termsAccepted ? 'termsAccepted-error' : undefined}
            />
            <span>{t.terms}</span>
          </label>
          {errors.termsAccepted && (
            <span id="termsAccepted-error" className="form-error">
              {errors.termsAccepted.message}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || !termsAccepted}
          className="btn btn-primary"
          aria-busy={isLoading}
        >
          {isLoading ? t.processing : t.submit}
        </button>
      </form>
    </div>
  );
}
