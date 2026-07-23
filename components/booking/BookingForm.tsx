'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingFormSchema, type BookingCheckoutFormInput } from '@/lib/booking/schema';
import { normalizePromoCode } from '@/lib/booking/promo-codes';
import { INFLUENCEUR_DISCOUNT_PERCENT, INFLUENCEUR_REF_STORAGE_KEY } from '@/lib/influenceurs/constants';
import { WELCOME_DISCOUNT_CODE } from '@/lib/newsletter/constants';
import { FormSecurityFields } from '@/components/forms/FormSecurityFields';
import type { TurnstileFieldHandle } from '@/components/forms/TurnstileField';

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
  const [influenceurInput, setInfluenceurInput] = useState('');
  const [validInfluenceurCode, setValidInfluenceurCode] = useState<string | null>(null);
  const [influenceurStatus, setInfluenceurStatus] = useState<
    'idle' | 'checking' | 'valid' | 'invalid'
  >('idle');
  const [activeDiscount, setActiveDiscount] = useState<'none' | 'influenceur' | 'promo'>('none');
  const feedbackRef = useRef<HTMLDivElement>(null);
  const turnstileRef = useRef<TurnstileFieldHandle>(null);
  const searchParams = useSearchParams();
  const refFromUrl = searchParams.get('ref');
  const promoFromUrl = searchParams.get('promo');
  const fromNewsletter = searchParams.get('from') === 'newsletter';
  const initialPromo = normalizePromoCode(
    promoFromUrl ?? (fromNewsletter ? WELCOME_DISCOUNT_CODE : ''),
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingCheckoutFormInput>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      locale,
      guestCount,
      checkInDate: '',
      checkOutDate: '',
      promoCode: initialPromo,
      termsAccepted: false,
    },
  });

  useEffect(() => {
    setValue('checkInDate', checkInDate, { shouldValidate: Boolean(checkInDate) });
    setValue('checkOutDate', checkOutDate, { shouldValidate: Boolean(checkOutDate) });
    setValue('guestCount', guestCount);
    setValue('locale', locale);
  }, [checkInDate, checkOutDate, guestCount, locale, setValue]);

  useEffect(() => {
    const refCode = normalizePromoCode(refFromUrl ?? '');
    const storedRef = normalizePromoCode(
      typeof window !== 'undefined' ? localStorage.getItem(INFLUENCEUR_REF_STORAGE_KEY) ?? '' : '',
    );
    const resolvedRef = refCode || storedRef;

    if (refCode) {
      localStorage.setItem(INFLUENCEUR_REF_STORAGE_KEY, refCode);
    }

    if (resolvedRef && !initialPromo) {
      setInfluenceurInput(resolvedRef);
      setActiveDiscount('influenceur');
      return;
    }

    if (initialPromo) {
      setActiveDiscount('promo');
    }
  }, [refFromUrl, initialPromo]);

  const promoValue = watch('promoCode') ?? '';
  const promoHasValue = normalizePromoCode(promoValue).length > 0;
  const promoLocked = activeDiscount === 'influenceur' && Boolean(validInfluenceurCode);
  const influenceurLocked = activeDiscount === 'promo' && promoHasValue;

  useEffect(() => {
    if (promoHasValue && activeDiscount === 'none') {
      setActiveDiscount('promo');
    }
  }, [promoHasValue, activeDiscount]);

  useEffect(() => {
    const trimmed = influenceurInput.trim();
    if (!trimmed) {
      setValidInfluenceurCode(null);
      setInfluenceurStatus('idle');
      return;
    }

    setInfluenceurStatus('checking');
    setValidInfluenceurCode(null);

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch('/api/promo/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: trimmed }),
        });
        const result = (await response.json()) as {
          valid?: boolean;
          discountPercent?: number;
        };

        if (cancelled) {
          return;
        }

        if (result.valid) {
          const code = normalizePromoCode(trimmed);
          setValidInfluenceurCode(code);
          setInfluenceurStatus('valid');
          localStorage.setItem(INFLUENCEUR_REF_STORAGE_KEY, code);
          if (activeDiscount !== 'promo') {
            setActiveDiscount('influenceur');
          }
          return;
        }

        setInfluenceurStatus('invalid');
      } catch {
        if (!cancelled) {
          setInfluenceurStatus('invalid');
        }
      }
    }, 500);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [influenceurInput, activeDiscount]);

  const turnstileConfigured =
    process.env.NODE_ENV !== 'development' &&
    Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

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
      stripeError: 'Stripe n\'a pas pu ouvrir la page de paiement. Réessayez dans quelques minutes ou contactez-nous.',
      rateLimit: 'Trop de tentatives. Patientez 15 minutes puis réessayez.',
      unavailable: 'Ces dates ne sont plus disponibles. Choisissez d\'autres dates.',
      captchaFailed: 'La vérification anti-spam a échoué. Rechargez la page et réessayez.',
      paymentsOff: 'Les paiements en ligne ne sont pas encore activés. Contactez-nous pour réserver.',
      pickDates: 'Sélectionnez vos dates d\'arrivée et de départ dans le calendrier.',
      captchaRequired: 'Veuillez valider la vérification anti-spam avant de continuer.',
      formInvalid: 'Veuillez remplir tous les champs obligatoires et accepter les conditions.',
      validationError: 'Certaines informations du formulaire sont invalides. Vérifiez l\'email et le téléphone, puis réessayez.',
      promoCode: 'Code promo (optionnel)',
      promoHint: 'Ex. WELCOME10 pour 10 % de réduction sur votre première réservation.',
      promoInvalid: 'Ce code promo est invalide. Vérifiez l\'orthographe et réessayez.',
      promoExpired: 'Ce code promo a expiré (valable 30 jours après inscription).',
      promoEmailMismatch: 'Ce code promo doit être utilisé avec l\'email de votre inscription newsletter.',
      influenceurCode: 'Code influenceur (optionnel)',
      influenceurHint: 'Si un créateur vous a recommandé Cueva Thalía, saisissez son code ici.',
      influenceurValid: 'Réduction de {percent} % appliquée via votre lien influenceur.',
      influenceurInvalid: 'Ce code influenceur n\'est pas reconnu.',
      influenceurChecking: 'Vérification du code…',
      influenceurLocked: 'Non cumulable avec le code promo déjà appliqué.',
      promoLocked: 'Non cumulable avec la réduction influenceur déjà appliquée.',
      discountConflict: 'Le code promo et le code influenceur ne peuvent pas être combinés.',
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
      stripeError: 'Stripe no pudo abrir la página de pago. Inténtelo en unos minutos o contáctenos.',
      rateLimit: 'Demasiados intentos. Espere 15 minutos e inténtelo de nuevo.',
      unavailable: 'Estas fechas ya no están disponibles. Elija otras fechas.',
      captchaFailed: 'La verificación anti-spam falló. Recargue la página e inténtelo de nuevo.',
      paymentsOff: 'Los pagos en línea aún no están activos. Contáctenos para reservar.',
      pickDates: 'Seleccione las fechas de llegada y salida en el calendario.',
      captchaRequired: 'Complete la verificación anti-spam antes de continuar.',
      formInvalid: 'Complete todos los campos obligatorios y acepte las condiciones.',
      validationError: 'Algunos datos del formulario no son válidos. Revise el email y el teléfono, e inténtelo de nuevo.',
      promoCode: 'Código promocional (opcional)',
      promoHint: 'Ej. WELCOME10 para un 10 % de descuento en su primera reserva.',
      promoInvalid: 'Este código promocional no es válido. Compruebe la ortografía e inténtelo de nuevo.',
      promoExpired: 'Este código promocional ha caducado (válido 30 días tras la inscripción).',
      promoEmailMismatch: 'Este código debe usarse con el email de su inscripción a la newsletter.',
      influenceurCode: 'Código de influencer (opcional)',
      influenceurHint: 'Si un creador le recomendó Cueva Thalía, introduzca su código aquí.',
      influenceurValid: 'Descuento del {percent} % aplicado gracias a su enlace de influencer.',
      influenceurInvalid: 'Este código de influencer no está reconocido.',
      influenceurChecking: 'Comprobando el código…',
      influenceurLocked: 'No acumulable con el código promocional ya aplicado.',
      promoLocked: 'No acumulable con el descuento de influencer ya aplicado.',
      discountConflict: 'El código promocional y el código de influencer no se pueden combinar.',
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
      stripeError: 'Stripe could not open the checkout page. Try again in a few minutes or contact us.',
      rateLimit: 'Too many attempts. Please wait 15 minutes and try again.',
      unavailable: 'These dates are no longer available. Please choose other dates.',
      captchaFailed: 'Anti-spam verification failed. Reload the page and try again.',
      paymentsOff: 'Online payments are not active yet. Contact us to book.',
      pickDates: 'Select your check-in and check-out dates on the calendar.',
      captchaRequired: 'Please complete the anti-spam check before continuing.',
      formInvalid: 'Please fill in all required fields and accept the terms.',
      validationError: 'Some form details look invalid. Check your email and phone, then try again.',
      promoCode: 'Promo code (optional)',
      promoHint: 'E.g. WELCOME10 for 10% off your first direct booking.',
      promoInvalid: 'This promo code is invalid. Check the spelling and try again.',
      promoExpired: 'This promo code has expired (valid for 30 days after sign-up).',
      promoEmailMismatch: 'This promo code must be used with the email from your newsletter sign-up.',
      influenceurCode: 'Influencer code (optional)',
      influenceurHint: 'If a creator recommended Cueva Thalía, enter their code here.',
      influenceurValid: '{percent}% discount applied via your influencer link.',
      influenceurInvalid: 'This influencer code is not recognized.',
      influenceurChecking: 'Checking code…',
      influenceurLocked: 'Cannot be combined with the promo code already applied.',
      promoLocked: 'Cannot be combined with the influencer discount already applied.',
      discountConflict: 'Promo code and influencer code cannot be combined.',
    },
  };

  const t = labels[locale] || labels.en;

  const showFeedback = (message: string) => {
    setError(message);
    requestAnimationFrame(() => {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  };

  const onSubmit = async (data: BookingCheckoutFormInput) => {
    if (hp.trim().length > 0) {
      return;
    }

    if (!checkInDate || !checkOutDate) {
      showFeedback(t.pickDates);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let token = '';
      if (turnstileConfigured) {
        try {
          token = (await turnstileRef.current?.getToken()) ?? '';
        } catch {
          throw new Error('captcha');
        }
        if (!token) {
          throw new Error('captcha');
        }
      }

      const response = await fetch('/api/stripe/booking/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          checkInDate,
          checkOutDate,
          locale,
          guestCount,
          promoCode: activeDiscount === 'promo' ? data.promoCode : '',
          ...(validInfluenceurCode && activeDiscount === 'influenceur'
            ? { influenceurCode: validInfluenceurCode }
            : {}),
          _hp: hp,
          turnstileToken: token,
        }),
      });

      let result: { ok?: boolean; url?: string; error?: string; code?: string };
      try {
        result = (await response.json()) as typeof result;
      } catch {
        throw new Error('network');
      }

      if (!response.ok || !result.ok || !result.url) {
        if (response.status === 409) {
          throw new Error('unavailable');
        }
        if (response.status === 403 || /captcha/i.test(result.error ?? '')) {
          throw new Error('captcha');
        }
        if (response.status === 503) {
          throw new Error('paymentsOff');
        }
        if (response.status === 429) {
          throw new Error('rateLimit');
        }
        if (response.status === 502 || result.code === 'stripe_error') {
          throw new Error('stripe');
        }
        if (response.status === 400 || result.code === 'validation_error') {
          throw new Error('validation');
        }
        if (result.code === 'promo_invalid') {
          throw new Error('promoInvalid');
        }
        if (result.code === 'promo_expired') {
          throw new Error('promoExpired');
        }
        if (result.code === 'promo_email_mismatch') {
          throw new Error('promoEmailMismatch');
        }
        if (result.code === 'influenceur_invalid') {
          throw new Error('influenceurInvalid');
        }
        if (result.code === 'discount_conflict') {
          throw new Error('discountConflict');
        }
        throw new Error(result.error || 'Checkout failed');
      }

      window.location.href = result.url;
    } catch (err) {
      const code = err instanceof Error ? err.message : '';
      const message =
        code === 'unavailable'
          ? t.unavailable
          : code === 'captcha'
            ? t.captchaFailed
            : code === 'paymentsOff'
              ? t.paymentsOff
              : code === 'stripe'
                ? t.stripeError
            : code === 'rateLimit'
              ? t.rateLimit
              : code === 'validation'
                ? t.validationError
                : code === 'promoInvalid'
                  ? t.promoInvalid
                  : code === 'promoExpired'
                    ? t.promoExpired
                    : code === 'promoEmailMismatch'
                      ? t.promoEmailMismatch
                      : code === 'influenceurInvalid'
                        ? t.influenceurInvalid
                        : code === 'discountConflict'
                          ? t.discountConflict
                      : t.error;
      showFeedback(message);
      if (code === 'captcha' || code === 'stripe') {
        turnstileRef.current?.reset();
      }
      setIsLoading(false);
    }
  };

  const onInvalid = () => {
    showFeedback(t.formInvalid);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="site-form">
      <input type="hidden" {...register('checkInDate')} />
      <input type="hidden" {...register('checkOutDate')} />
      <input type="hidden" {...register('locale')} />

      {(errors.checkInDate || errors.checkOutDate) && (
        <div className="form-alert form-alert--error" role="alert">
          {errors.checkInDate?.message || errors.checkOutDate?.message || t.pickDates}
        </div>
      )}

      {validInfluenceurCode && activeDiscount === 'influenceur' && (
        <div className="booking-discount-banner" role="status">
          {t.influenceurValid.replace('{percent}', String(INFLUENCEUR_DISCOUNT_PERCENT))}
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
        <label htmlFor="booking-promo">{t.promoCode}</label>
        <input
          id="booking-promo"
          type="text"
          autoComplete="off"
          spellCheck={false}
          placeholder="WELCOME10"
          {...register('promoCode')}
          disabled={isLoading || promoLocked}
          aria-describedby="booking-promo-hint"
          className="booking-promo-input"
        />
        <span id="booking-promo-hint" className="form-hint">
          {promoLocked ? t.promoLocked : t.promoHint}
        </span>
        {errors.promoCode && (
          <span className="form-error">{errors.promoCode.message}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="booking-influenceur">{t.influenceurCode}</label>
        <input
          id="booking-influenceur"
          type="text"
          autoComplete="off"
          spellCheck={false}
          value={influenceurInput}
          onChange={(event) => {
            if (influenceurLocked) {
              return;
            }
            setInfluenceurInput(event.target.value);
            if (event.target.value.trim() && activeDiscount === 'none') {
              setActiveDiscount('influenceur');
            }
          }}
          disabled={isLoading || influenceurLocked}
          aria-describedby="booking-influenceur-feedback"
          className="booking-promo-input"
        />
        <span
          id="booking-influenceur-feedback"
          className={
            influenceurStatus === 'valid' && activeDiscount === 'influenceur'
              ? 'form-hint form-hint--success'
              : influenceurStatus === 'invalid'
                ? 'form-hint form-hint--invalid'
                : 'form-hint'
          }
          aria-live="polite"
        >
          {influenceurLocked
            ? t.influenceurLocked
            : influenceurStatus === 'checking'
              ? t.influenceurChecking
              : influenceurStatus === 'valid' && activeDiscount === 'influenceur'
                ? t.influenceurValid.replace('{percent}', String(INFLUENCEUR_DISCOUNT_PERCENT))
                : influenceurStatus === 'invalid'
                  ? t.influenceurInvalid
                  : t.influenceurHint}
        </span>
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
        turnstileRef={turnstileRef}
        executeOnSubmit
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

      <div ref={feedbackRef} className="booking-form-feedback">
        {error && (
          <div className="form-alert form-alert--error" role="alert">
            {error}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary booking-form-submit"
        aria-busy={isLoading}
      >
        {isLoading ? t.processing : t.submit}
      </button>
    </form>
  );
}
