'use client';

import { useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { FormSecurityFields } from '@/components/forms/FormSecurityFields';
import type { TurnstileFieldHandle } from '@/components/forms/TurnstileField';
import { INFLUENCEUR_COMMISSION_PERCENT, INFLUENCEUR_DISCOUNT_PERCENT } from '@/lib/influenceurs/constants';

type SignupFormValues = {
  nom: string;
  email: string;
  instagram?: string;
};

type SuccessState = {
  code: string;
  trackingUrl: string;
};

interface InfluenceurSignupFormProps {
  locale: 'fr' | 'es' | 'en';
}

export default function InfluenceurSignupForm({ locale }: InfluenceurSignupFormProps) {
  const t = useTranslations('Influenceur');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessState | null>(null);
  const [copied, setCopied] = useState(false);
  const [hp, setHp] = useState('');
  const [, setTurnstileToken] = useState('');
  const turnstileRef = useRef<TurnstileFieldHandle>(null);

  const signupSchema = useMemo(
    () =>
      z.object({
        nom: z.string().min(2, t('error_name_short')),
        email: z.string().email(t('error_email_invalid')),
        instagram: z.string().max(64).optional(),
      }),
    [t],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const turnstileConfigured =
    process.env.NODE_ENV !== 'development' &&
    Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const onSubmit = async (data: SignupFormValues) => {
    if (hp.trim().length > 0) {
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      let turnstileToken = '';
      if (turnstileConfigured) {
        turnstileToken = (await turnstileRef.current?.getToken()) ?? '';
        if (!turnstileToken) {
          throw new Error('captcha');
        }
      }

      const response = await fetch('/api/influenceur/rejoindre', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, locale, _hp: hp, turnstileToken }),
      });

      const result = (await response.json()) as {
        ok?: boolean;
        code?: string;
        trackingUrl?: string;
      };

      if (!response.ok || !result.ok || !result.code || !result.trackingUrl) {
        if (result.code === 'email_taken') {
          throw new Error('email_taken');
        }
        if (response.status === 403) {
          throw new Error('captcha');
        }
        throw new Error('generic');
      }

      setSuccess({ code: result.code, trackingUrl: result.trackingUrl });
      setStatus('idle');
    } catch (err) {
      const code = err instanceof Error ? err.message : 'generic';
      setStatus('error');
      setErrorMessage(
        code === 'email_taken'
          ? t('error_email_taken')
          : code === 'captcha'
            ? t('error_captcha')
            : t('error_generic'),
      );
      if (code === 'captcha') {
        turnstileRef.current?.reset();
      }
    }
  };

  const copyLink = async () => {
    if (!success?.trackingUrl) {
      return;
    }
    try {
      await navigator.clipboard.writeText(success.trackingUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (success) {
    return (
      <div className="influenceur-success">
        <p className="influenceur-success-kicker small-caps">{t('success_kicker')}</p>
        <h2>{t('success_title')}</h2>
        <p className="editorial-text">{t('success_text')}</p>
        <div className="influenceur-link-box">
          <a
            href={success.trackingUrl}
            className="influenceur-link-url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {success.trackingUrl}
          </a>
          <button type="button" className="btn btn-secondary influenceur-copy-btn" onClick={copyLink}>
            {copied ? t('copied') : t('copy_link')}
          </button>
        </div>
        <p className="form-hint">
          {t('success_summary', {
            code: success.code,
            guestDiscount: INFLUENCEUR_DISCOUNT_PERCENT,
            commissionPercent: INFLUENCEUR_COMMISSION_PERCENT,
          })}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="site-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="influenceur-nom">{t('name')}</label>
          <input
            id="influenceur-nom"
            type="text"
            autoComplete="name"
            disabled={status === 'loading'}
            {...register('nom')}
          />
          {errors.nom && <span className="form-error">{errors.nom.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="influenceur-email">{t('email')}</label>
          <input
            id="influenceur-email"
            type="email"
            autoComplete="email"
            disabled={status === 'loading'}
            {...register('email')}
          />
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="influenceur-instagram">{t('instagram')}</label>
        <input
          id="influenceur-instagram"
          type="text"
          autoComplete="off"
          placeholder={t('instagram_placeholder')}
          disabled={status === 'loading'}
          {...register('instagram')}
        />
        {errors.instagram && <span className="form-error">{errors.instagram.message}</span>}
      </div>

      <FormSecurityFields
        turnstileRef={turnstileRef}
        executeOnSubmit
        honeypotProps={{
          value: hp,
          onChange: (event) => setHp(event.target.value),
        }}
        onTokenChange={setTurnstileToken}
      />

      {errorMessage && (
        <div className="form-alert form-alert--error" role="alert">
          {errorMessage}
        </div>
      )}

      <p className="form-hint">
        {t('form_hint', {
          guestDiscount: INFLUENCEUR_DISCOUNT_PERCENT,
          commissionPercent: INFLUENCEUR_COMMISSION_PERCENT,
        })}
      </p>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
