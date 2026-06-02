'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

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

  const { register, handleSubmit, formState: { errors }, reset } = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
  });

  const onSubmit = async (data: EventFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/forms/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('API Error');
      
      setStatus('success');
      reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-8 bg-ct-vert/10 border border-ct-vert/30 rounded-lg text-center text-ct-brun-chaud">
        <p className="font-medium text-lg">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto p-8 bg-white/50 backdrop-blur-sm rounded-xl border border-ct-dune/20 shadow-sm">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider">{t('name')}</label>
          <input {...register('name')} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors" />
          {errors.name && <span className="text-xs text-red-500">Requis</span>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider">{t('email')}</label>
          <input type="email" {...register('email')} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors" />
          {errors.email && <span className="text-xs text-red-500">Email invalide</span>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider">{t('phone')}</label>
          <input {...register('phone')} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider">{t('event_type')}</label>
          <select {...register('eventType')} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors">
            <option value="">Sélectionnez...</option>
            <option value="anniversaire">Anniversaire / Célébration</option>
            <option value="shooting">Shooting / Privatisation</option>
            <option value="mariage">Petit Mariage</option>
            <option value="autre">Autre</option>
          </select>
          {errors.eventType && <span className="text-xs text-red-500">Requis</span>}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider">{t('date')}</label>
          <input {...register('date')} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors" />
          {errors.date && <span className="text-xs text-red-500">Requis</span>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider">{t('guests')}</label>
          <input type="number" {...register('guests')} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors" />
          {errors.guests && <span className="text-xs text-red-500">Requis</span>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium uppercase tracking-wider">{t('message')}</label>
        <textarea {...register('message')} rows={4} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors resize-none" />
        {errors.message && <span className="text-xs text-red-500">Message trop court</span>}
      </div>

      {status === 'error' && (
        <div className="text-red-500 text-sm text-center">{t('error')}</div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-ct-brun-chaud text-white p-4 uppercase tracking-widest text-sm font-medium hover:bg-ct-terracotta transition-colors disabled:opacity-50"
      >
        {status === 'loading' ? t('sending') : t('submit')}
      </button>
      
      {/* Honeypot hidden input against spam */}
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
    </form>
  );
}
