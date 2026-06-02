'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormSecurityFields } from '@/components/forms/FormSecurityFields';

const workshopSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  workshopType: z.string().min(2),
  date: z.string().min(2),
  guests: z.string().min(1),
  message: z.string().min(10),
});

type WorkshopFormValues = z.infer<typeof workshopSchema>;

export default function WorkshopForm() {
  const t = useTranslations('Forms');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hp, setHp] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<WorkshopFormValues>({
    resolver: zodResolver(workshopSchema),
  });

  const onSubmit = async (data: WorkshopFormValues) => {
    if (hp.trim().length > 0) {
      setStatus('success');
      reset();
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/forms/workshop', {
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
          <label htmlFor="workshop-name">{t('name')}</label>
          <input id="workshop-name" {...register('name')} autoComplete="name" />
          {errors.name && <span className="form-error">Requis</span>}
        </div>
        <div className="form-group">
          <label htmlFor="workshop-email">{t('email')}</label>
          <input id="workshop-email" type="email" {...register('email')} autoComplete="email" />
          {errors.email && <span className="form-error">Email invalide</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="workshop-phone">{t('phone')}</label>
          <input id="workshop-phone" type="tel" {...register('phone')} autoComplete="tel" />
        </div>
        <div className="form-group">
          <label htmlFor="workshop-type">Type de retraite</label>
          <select id="workshop-type" {...register('workshopType')} defaultValue="">
            <option value="" disabled>
              Sélectionnez…
            </option>
            <option value="yoga">Yoga / Méditation</option>
            <option value="breathwork">Breathwork / Sonothérapie</option>
            <option value="coaching">Coaching / Créatif</option>
            <option value="autre">Autre</option>
          </select>
          {errors.workshopType && <span className="form-error">Requis</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="workshop-date">{t('date')}</label>
          <input id="workshop-date" {...register('date')} placeholder="Ex. juin 2026" />
          {errors.date && <span className="form-error">Requis</span>}
        </div>
        <div className="form-group">
          <label htmlFor="workshop-guests">{t('guests')}</label>
          <input id="workshop-guests" type="number" min={1} {...register('guests')} />
          {errors.guests && <span className="form-error">Requis</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="workshop-message">{t('message')}</label>
        <textarea id="workshop-message" rows={4} {...register('message')} />
        {errors.message && <span className="form-error">Message trop court</span>}
      </div>

      <FormSecurityFields onTokenChange={setTurnstileToken} honeypotProps={{ value: hp, onChange: (e) => setHp(e.target.value) }} />

      {status === 'error' && <p className="form-alert">{t('error')}</p>}

      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
