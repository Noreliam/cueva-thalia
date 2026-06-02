'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FormSecurityFields } from '@/components/forms/FormSecurityFields';

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const t = useTranslations('Forms');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hp, setHp] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    if (hp.trim().length > 0) {
      setStatus('success');
      reset();
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/forms/contact', {
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
          <label htmlFor="contact-name">{t('name')}</label>
          <input id="contact-name" {...register('name')} autoComplete="name" />
          {errors.name && <span className="form-error">Requis</span>}
        </div>
        <div className="form-group">
          <label htmlFor="contact-email">{t('email')}</label>
          <input id="contact-email" type="email" {...register('email')} autoComplete="email" />
          {errors.email && <span className="form-error">Email invalide</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="contact-phone">{t('phone')} (optionnel)</label>
        <input id="contact-phone" type="tel" {...register('phone')} autoComplete="tel" />
      </div>

      <div className="form-group">
        <label htmlFor="contact-message">{t('message')}</label>
        <textarea id="contact-message" rows={4} {...register('message')} />
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
