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
          <label htmlFor="gift-name">{t('name')} (vous)</label>
          <input id="gift-name" {...register('name')} autoComplete="name" />
          {errors.name && <span className="form-error">Requis</span>}
        </div>
        <div className="form-group">
          <label htmlFor="gift-email">{t('email')}</label>
          <input id="gift-email" type="email" {...register('email')} autoComplete="email" />
          {errors.email && <span className="form-error">Email invalide</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="gift-type">Format du bon</label>
          <select id="gift-type" {...register('giftType')} defaultValue="">
            <option value="" disabled>
              Sélectionnez…
            </option>
            <option value="1_nuit">1 Nuit (Semaine)</option>
            <option value="1_nuit_we">1 Nuit (Week-end)</option>
            <option value="2_nuits">2 Nuits</option>
            <option value="custom">Montant personnalisé</option>
          </select>
          {errors.giftType && <span className="form-error">Requis</span>}
        </div>
        <div className="form-group">
          <label htmlFor="gift-recipient">Nom du destinataire</label>
          <input id="gift-recipient" {...register('recipientName')} />
          {errors.recipientName && <span className="form-error">Requis</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="gift-message">Petit mot pour le destinataire (optionnel)</label>
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
