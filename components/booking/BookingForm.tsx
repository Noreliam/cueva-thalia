'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingCheckoutSchema, type BookingCheckoutFormInput } from '@/lib/booking/schema';
import { FormSecurityFields } from '@/components/forms/FormSecurityFields';

interface BookingFormProps {
  locale?: 'fr' | 'es' | 'en';
  guestCount?: number;
}

export default function BookingForm({ locale = 'en', guestCount = 2 }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hp, setHp] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingCheckoutFormInput>({
    resolver: zodResolver(bookingCheckoutSchema),
    defaultValues: {
      locale,
      guestCount,
      termsAccepted: false,
    },
  });

  const termsAccepted = watch('termsAccepted');

  const onSubmit = async (data: BookingCheckoutFormInput) => {
    if (hp.trim().length > 0) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/stripe/booking/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          locale,
          guestCount,
          _hp: hp,
          turnstileToken,
        }),
      });

      const result = (await response.json()) as { ok?: boolean; url?: string; error?: string };

      if (!response.ok || !result.ok || !result.url) {
        if (response.status === 409) {
          throw new Error('unavailable');
        }
        throw new Error(result.error || 'Checkout failed');
      }

      window.location.href = result.url;
    } catch (err) {
      const message =
        err instanceof Error && err.message === 'unavailable' ? t.unavailable : t.error;
      setError(message);
      setIsLoading(false);
    }
  };

  const labels = {
    fr: {
      name: 'Nom complet',
      email: 'Email',
      phone: 'Téléphone (optionnel)',
      checkIn: 'Date d\'arrivée',
      checkOut: 'Date de départ',
      requests: 'Demandes spéciales',
      terms: 'J\'accepte les conditions générales',
      submit: 'Procéder au paiement',
      processing: 'Traitement...',
      error: 'Le paiement n\'a pas pu être lancé. Réessayez ou contactez-nous.',
      unavailable: 'Ces dates ne sont pas disponibles. Vérifiez le calendrier ci-dessus.',
    },
    es: {
      name: 'Nombre completo',
      email: 'Email',
      phone: 'Teléfono (opcional)',
      checkIn: 'Fecha de llegada',
      checkOut: 'Fecha de salida',
      requests: 'Solicitudes especiales',
      terms: 'Acepto los términos y condiciones',
      submit: 'Proceder al pago',
      processing: 'Procesando...',
      error: 'No se pudo iniciar el pago. Inténtelo de nuevo o contáctenos.',
      unavailable: 'Estas fechas no están disponibles. Consulte el calendario arriba.',
    },
    en: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone (optional)',
      checkIn: 'Check-in date',
      checkOut: 'Check-out date',
      requests: 'Special requests',
      terms: 'I accept the terms and conditions',
      submit: 'Proceed to payment',
      processing: 'Processing...',
      error: 'Payment could not be started. Please try again or contact us.',
      unavailable: 'These dates are not available. Check the calendar above.',
    },
  };

  const t = labels[locale] || labels.en;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="site-form">
      {error && (
        <div className="form-alert form-alert--error" role="alert">
          {t.error}
        </div>
      )}

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="booking-name">{t.name}</label>
          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            {...register('name')}
            disabled={isLoading}
            aria-describedby={errors.name ? 'booking-name-error' : undefined}
          />
          {errors.name && (
            <span id="booking-name-error" className="form-error">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="booking-email">{t.email}</label>
          <input
            id="booking-email"
            type="email"
            autoComplete="email"
            {...register('email')}
            disabled={isLoading}
            aria-describedby={errors.email ? 'booking-email-error' : undefined}
          />
          {errors.email && (
            <span id="booking-email-error" className="form-error">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="booking-phone">{t.phone}</label>
        <input
          id="booking-phone"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
          disabled={isLoading}
          aria-describedby={errors.phone ? 'booking-phone-error' : undefined}
        />
        {errors.phone && (
          <span id="booking-phone-error" className="form-error">
            {errors.phone.message}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="booking-check-in">{t.checkIn}</label>
          <input
            id="booking-check-in"
            type="date"
            {...register('checkInDate')}
            disabled={isLoading}
            aria-describedby={errors.checkInDate ? 'booking-check-in-error' : undefined}
          />
          {errors.checkInDate && (
            <span id="booking-check-in-error" className="form-error">
              {errors.checkInDate.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="booking-check-out">{t.checkOut}</label>
          <input
            id="booking-check-out"
            type="date"
            {...register('checkOutDate')}
            disabled={isLoading}
            aria-describedby={errors.checkOutDate ? 'booking-check-out-error' : undefined}
          />
          {errors.checkOutDate && (
            <span id="booking-check-out-error" className="form-error">
              {errors.checkOutDate.message}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="booking-requests">{t.requests}</label>
        <textarea
          id="booking-requests"
          rows={4}
          {...register('specialRequests')}
          disabled={isLoading}
          aria-describedby={errors.specialRequests ? 'booking-requests-error' : undefined}
        />
        {errors.specialRequests && (
          <span id="booking-requests-error" className="form-error">
            {errors.specialRequests.message}
          </span>
        )}
      </div>

      <input type="hidden" {...register('guestCount', { valueAsNumber: true })} />

      <FormSecurityFields
        honeypotProps={{
          value: hp,
          onChange: (event) => setHp(event.target.value),
        }}
        onTokenChange={setTurnstileToken}
      />

      <div className="form-group form-group--checkbox">
        <label htmlFor="booking-terms" className="checkbox-label">
          <input
            id="booking-terms"
            type="checkbox"
            {...register('termsAccepted')}
            disabled={isLoading}
            aria-describedby={errors.termsAccepted ? 'booking-terms-error' : undefined}
          />
          <span>{t.terms}</span>
        </label>
        {errors.termsAccepted && (
          <span id="booking-terms-error" className="form-error">
            {errors.termsAccepted.message}
          </span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading || !termsAccepted || !turnstileToken}
        className="btn btn-primary"
        aria-busy={isLoading}
      >
        {isLoading ? t.processing : t.submit}
      </button>
    </form>
  );
}
