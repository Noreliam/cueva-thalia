'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

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

  const { register, handleSubmit, formState: { errors }, reset } = useForm<GiftCardFormValues>({
    resolver: zodResolver(giftCardSchema),
  });

  const onSubmit = async (data: GiftCardFormValues) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/forms/bon-cadeau', {
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
          <label className="text-sm font-medium uppercase tracking-wider">{t('name')} (Vous)</label>
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
          <label className="text-sm font-medium uppercase tracking-wider">Format du bon</label>
          <select {...register('giftType')} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors">
            <option value="">Sélectionnez...</option>
            <option value="1_nuit">1 Nuit (Semaine)</option>
            <option value="1_nuit_we">1 Nuit (Week-end)</option>
            <option value="2_nuits">2 Nuits</option>
            <option value="custom">Montant personnalisé</option>
          </select>
          {errors.giftType && <span className="text-xs text-red-500">Requis</span>}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium uppercase tracking-wider">Nom du destinataire</label>
          <input {...register('recipientName')} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors" />
          {errors.recipientName && <span className="text-xs text-red-500">Requis</span>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium uppercase tracking-wider">Petit mot pour le destinataire (Optionnel)</label>
        <textarea {...register('message')} rows={3} className="w-full p-3 bg-transparent border-b border-ct-dune/50 focus:border-ct-terracotta outline-none transition-colors resize-none" />
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
      
      <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />
    </form>
  );
}
