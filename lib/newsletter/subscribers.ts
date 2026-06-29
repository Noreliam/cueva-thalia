import { WELCOME_DISCOUNT_CODE } from '@/lib/newsletter/constants';
import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export type NewsletterSource = 'popup_welcome' | 'popup_exit';

export async function saveNewsletterSubscriber(params: {
  email: string;
  locale: string;
  source: NewsletterSource;
}): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    console.warn('[NEWSLETTER] Supabase not configured — subscription not persisted');
    return false;
  }

  const email = params.email.trim().toLowerCase();

  const { error } = await getSupabaseAdmin()
    .from('newsletter_subscribers')
    .upsert(
      {
        email,
        locale: params.locale,
        source: params.source,
        welcome_code: WELCOME_DISCOUNT_CODE,
        unsubscribed_at: null,
      },
      { onConflict: 'email' },
    );

  if (error) {
    console.error('[NEWSLETTER] failed to save subscriber', {
      email,
      code: error.code,
      message: error.message,
    });
    throw error;
  }

  return true;
}
