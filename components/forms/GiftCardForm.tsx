'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormSecurityFields } from '@/components/forms/FormSecurityFields';

const giftCardSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  giftType: z.string().min(2),
  recipientName: z.string().min(2),
  message: z.string().optional(),
});

type GiftCardFormValues = z.infer<typeof giftCardSchema>;

export default function GiftCardForm() {
  const t = useTranslations('Forms');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hp, setHp] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<GiftCardFormValues>({
    resolver: zodResolver(giftCardSchema),
  });

  const onSubmit = async (data: GiftCardFormValues) => {
    if (hp.trim().length > 0) {
      setStatus('success');
      reset();
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/forms/bon-cadeau', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _hp: hp, turnstileToken }),
      });

      if (!res.ok) throw new Error('API Error');

      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="confirmation-message">
        <p>{t('success')}</p>
      </div>
    );
  }

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
            <option value="1_nuit">{t('gift_type_1_night_week')}</option>
            <option value="1_nuit_we">{t('gift_type_1_night_weekend')}</option>
            <option value="2_nuits">{t('gift_type_2_nights')}</option>
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

      <div className="form-group">
        <label htmlFor="gift-message">{t('gift_message_label')}</label>
        <textarea id="gift-message" rows={3} {...register('message')} />
      </div>

      <FormSecurityFields onTokenChange={setTurnstileToken} honeypotProps={{ value: hp, onChange: (e) => setHp(e.target.value) }} />

      {status === 'error' && <p className="form-alert">{t('error')}</p>}

      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
