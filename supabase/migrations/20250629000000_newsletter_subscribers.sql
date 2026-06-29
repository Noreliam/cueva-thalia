create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  locale text not null default 'es',
  source text not null default 'popup_welcome',
  welcome_code text not null default 'WELCOME10',
  subscribed_at timestamptz not null default now(),
  unsubscribed_at timestamptz
);

create index if not exists newsletter_subscribers_subscribed_at_idx
  on public.newsletter_subscribers (subscribed_at desc);

alter table public.newsletter_subscribers enable row level security;

-- Lecture réservée aux utilisateurs authentifiés (dashboard Manon).
create policy "authenticated_read_newsletter_subscribers"
  on public.newsletter_subscribers
  for select
  using (auth.role() = 'authenticated');

-- Les insertions passent par SUPABASE_SERVICE_ROLE_KEY côté serveur (bypass RLS).
