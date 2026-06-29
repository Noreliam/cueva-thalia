import { getSupabaseAdmin, isSupabaseConfigured } from '@/lib/supabase/server';

export type NewsletterSubscriber = {
  id: string;
  email: string;
  locale: string;
  source: string;
  welcome_code: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
};

export async function listNewsletterSubscribers(): Promise<NewsletterSubscriber[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data, error } = await getSupabaseAdmin()
    .from('newsletter_subscribers')
    .select('id, email, locale, source, welcome_code, subscribed_at, unsubscribed_at')
    .is('unsubscribed_at', null)
    .order('subscribed_at', { ascending: false });

  if (error) {
    console.error('[NEWSLETTER] failed to list subscribers', error.message);
    throw error;
  }

  return data ?? [];
}

export function subscribersToCsv(subscribers: NewsletterSubscriber[]): string {
  const header = 'email,locale,source,code,inscription';
  const rows = subscribers.map((row) =>
    [
      row.email,
      row.locale,
      row.source,
      row.welcome_code,
      new Date(row.subscribed_at).toISOString(),
    ]
      .map((value) => `"${String(value).replace(/"/g, '""')}"`)
      .join(','),
  );
  return [header, ...rows].join('\n');
}
