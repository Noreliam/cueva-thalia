'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingCheckoutSchema, type BookingCheckoutFormInput } from '@/lib/booking/schema';
import { FormSecurityFields } from '@/components/forms/FormSecurityFields';

interface BookingFormProps {
  locale?: 'fr' | 'es' | 'en';
  guestCount?: number;
  checkInDate: string;
  checkOutDate: string;
}

export default function BookingForm({
  locale = 'en',
  guestCount = 2,
  checkInDate,
  checkOutDate,
}: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hp, setHp] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<BookingCheckoutFormInput>({
    resolver: zodResolver(bookingCheckoutSchema),
    defaultValues: {
      locale,
      guestCount,
      checkInDate: '',
      checkOutDate: '',
      termsAccepted: false,
    },
  });

  useEffect(() => {
    setValue('checkInDate', checkInDate, { shouldValidate: Boolean(checkInDate) });
    setValue('checkOutDate', checkOutDate, { shouldValidate: Boolean(checkOutDate) });
  }, [checkInDate, checkOutDate, setValue]);

  const termsAccepted = watch('termsAccepted');

  const onSubmit = async (data: BookingCheckoutFormInput) => {
    if (hp.trim().length > 0) {
      return;
    }

    if (!checkInDate || !checkOutDate) {
      setError(t.pickDates);
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
          checkInDate,
          checkOutDate,
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
      requests: 'Demandes spéciales',
      terms: 'J\'accepte les conditions générales',
      submit: 'Procéder au paiement',
      processing: 'Traitement...',
      error: 'Le paiement n\'a pas pu être lancé. Réessayez ou contactez-nous.',
      unavailable: 'Ces dates ne sont plus disponibles. Choisissez d\'autres dates.',
      pickDates: 'Sélectionnez vos dates d\'arrivée et de départ dans le calendrier.',
    },
    es: {
      name: 'Nombre completo',
      email: 'Email',
      phone: 'Teléfono (opcional)',
      requests: 'Solicitudes especiales',
      terms: 'Acepto los términos y condiciones',
      submit: 'Proceder al pago',
      processing: 'Procesando...',
      error: 'No se pudo iniciar el pago. Inténtelo de nuevo o contáctenos.',
      unavailable: 'Estas fechas ya no están disponibles. Elija otras fechas.',
      pickDates: 'Seleccione las fechas de llegada y salida en el calendario.',
    },
    en: {
      name: 'Full name',
      email: 'Email',
      phone: 'Phone (optional)',
      requests: 'Special requests',
      terms: 'I accept the terms and conditions',
      submit: 'Proceed to payment',
      processing: 'Processing...',
      error: 'Payment could not be started. Please try again or contact us.',
      unavailable: 'These dates are no longer available. Please choose other dates.',
      pickDates: 'Select your check-in and check-out dates on the calendar.',
    },
  };

  const t = labels[locale] || labels.en;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="site-form">
      {error && (
        <div className="form-alert form-alert--error" role="alert">
          {error}
        </div>
      )}

      <input type="hidden" {...register('checkInDate')} />
      <input type="hidden" {...register('checkOutDate')} />

      {(errors.checkInDate || errors.checkOutDate) && (
        <div className="form-alert form-alert--error" role="alert">
          {errors.checkInDate?.message || errors.checkOutDate?.message || t.pickDates}
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
        disabled={isLoading || !termsAccepted || !turnstileToken || !checkInDate || !checkOutDate}
        className="btn btn-primary"
        aria-busy={isLoading}
      >
        {isLoading ? t.processing : t.submit}
      </button>
    </form>
  );
}
