'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormSecurityFields } from '@/components/forms/FormSecurityFields';

const eventSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  eventType: z.string().min(2),
  date: z.string().min(2),
  guests: z.string().min(1),
  message: z.string().min(10),
});

type EventFormValues = z.infer<typeof eventSchema>;

export default function EventForm() {
  const t = useTranslations('Forms');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hp, setHp] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: EventFormValues) => {
    if (hp.trim().length > 0) {
      setStatus('success');
      reset();
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/forms/event', {
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
          <label htmlFor="event-name">{t('name')}</label>
          <input id="event-name" {...register('name')} autoComplete="name" />
          {errors.name && <span className="form-error">{t('error_required')}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="event-email">{t('email')}</label>
          <input id="event-email" type="email" {...register('email')} autoComplete="email" />
          {errors.email && <span className="form-error">{t('error_email')}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="event-phone">{t('phone')}</label>
          <input id="event-phone" type="tel" {...register('phone')} autoComplete="tel" />
        </div>
        <div className="form-group">
          <label htmlFor="event-type">{t('event_type')}</label>
          <select id="event-type" {...register('eventType')} defaultValue="">
            <option value="" disabled>
              {t('select_placeholder')}
            </option>
            <option value="anniversaire">{t('event_type_birthday')}</option>
            <option value="shooting">{t('event_type_shooting')}</option>
            <option value="mariage">{t('event_type_wedding')}</option>
            <option value="autre">{t('event_type_other')}</option>
          </select>
          {errors.eventType && <span className="form-error">{t('error_required')}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="event-date">{t('date')}</label>
          <input
            id="event-date"
            {...register('date')}
            placeholder={t('date_placeholder_event')}
          />
          {errors.date && <span className="form-error">{t('error_required')}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="event-guests">{t('guests')}</label>
          <input id="event-guests" type="number" min={1} {...register('guests')} />
          {errors.guests && <span className="form-error">{t('error_required')}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="event-message">{t('message')}</label>
        <textarea id="event-message" rows={4} {...register('message')} />
        {errors.message && <span className="form-error">{t('error_message_short')}</span>}
      </div>

      <FormSecurityFields onTokenChange={setTurnstileToken} honeypotProps={{ value: hp, onChange: (e) => setHp(e.target.value) }} />

      {status === 'error' && <p className="form-alert">{t('error')}</p>}

      <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
        {status === 'loading' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
