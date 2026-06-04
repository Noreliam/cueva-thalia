'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FormSecurityFields } from '@/components/forms/FormSecurityFields';

const giftCardSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().optional(),
    giftType: z.enum(['1_nuit', '1_nuit_we', '2_nuits', 'custom']),
    customAmountEuros: z.number().positive().optional(),
    recipientName: z.string().min(2),
    message: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.giftType === 'custom' && !data.customAmountEuros) {
      ctx.addIssue({
        code: 'custom',
        path: ['customAmountEuros'],
        message: 'required',
      });
    }
  });

type GiftCardFormValues = z.infer<typeof giftCardSchema>;

export default function GiftCardForm() {
  const t = useTranslations('Forms');
  const locale = useLocale();
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hp, setHp] = useState('');

  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm<GiftCardFormValues>({
    resolver: zodResolver(giftCardSchema),
  });

  const giftType = watch('giftType');

  const onSubmit = async (data: GiftCardFormValues) => {
    if (hp.trim().length > 0) {
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          locale,
          _hp: hp,
          turnstileToken,
          customAmountEuros:
            data.giftType === 'custom' ? data.customAmountEuros : undefined,
        }),
      });

      const json = (await res.json()) as { ok?: boolean; url?: string };

      if (!res.ok || !json.ok || !json.url) {
        throw new Error('Checkout failed');
      }

      window.location.href = json.url;
    } catch {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="site-form">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="gift-name">{t('gift_name_you')}</label>
          <input id="gift-name" {...register('name')} autoComplete="name" />
          {errors.name && <span className="form-error">{t('error_required')}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="gift-email">{t('email')}</label>
          <input id="gift-email" type="email" {...register('email')} autoComplete="email" />
          {errors.email && <span className="form-error">{t('error_email')}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="gift-type">{t('gift_type_label')}</label>
          <select id="gift-type" {...register('giftType')} defaultValue="">
            <option value="" disabled>
              {t('select_placeholder')}
            </option>
            <option value="1_nuit">{t('gift_type_1_night_week')} — 200 €</option>
            <option value="1_nuit_we">{t('gift_type_1_night_weekend')} — 250 €</option>
            <option value="2_nuits">{t('gift_type_2_nights')} — 400 €</option>
            <option value="custom">{t('gift_type_custom')}</option>
          </select>
          {errors.giftType && <span className="form-error">{t('error_required')}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="gift-recipient">{t('gift_recipient_label')}</label>
          <input id="gift-recipient" {...register('recipientName')} />
          {errors.recipientName && <span className="form-error">{t('error_required')}</span>}
        </div>
      </div>

      {giftType === 'custom' && (
        <div className="form-group">
          <label htmlFor="gift-custom-amount">{t('gift_custom_amount_label')}</label>
          <input
            id="gift-custom-amount"
            type="number"
            min={50}
            max={2000}
            step={1}
            inputMode="numeric"
            {...register('customAmountEuros', { valueAsNumber: true })}
          />
          <p className="form-hint">{t('gift_custom_amount_hint')}</p>
          {errors.customAmountEuros && (
            <span className="form-error">{t('gift_custom_amount_error')}</span>
          )}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="gift-message">{t('gift_message_label')}</label>
        <textarea id="gift-message" rows={3} {...register('message')} />
      </div>

      <FormSecurityFields onTokenChange={setTurnstileToken} honeypotProps={{ value: hp, onChange: (e) => setHp(e.target.value) }} />

      {status === 'error' && <p className="form-alert">{t('gift_checkout_error')}</p>}

      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? t('gift_checkout_loading') : t('gift_pay')}
      </button>
    </form>
  );
}
