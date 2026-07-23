create table if not exists public.influenceurs (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text not null,
  code text unique not null,
  pourcentage numeric not null,
  created_at timestamptz not null default now(),
  constraint influenceurs_code_uppercase check (code = upper(code))
);

create table if not exists public.commissions (
  id uuid primary key default gen_random_uuid(),
  influenceur_code text not null references public.influenceurs (code) on delete restrict,
  stripe_session_id text not null,
  montant_reservation numeric not null,
  commission_due numeric not null,
  statut text not null default 'en_attente',
  created_at timestamptz not null default now(),
  constraint commissions_statut_valid check (statut in ('en_attente', 'payée'))
);

create index if not exists commissions_influenceur_code_idx
  on public.commissions (influenceur_code);

create index if not exists commissions_statut_idx
  on public.commissions (statut);

create index if not exists commissions_created_at_idx
  on public.commissions (created_at desc);

create or replace function public.influenceurs_uppercase_code()
returns trigger
language plpgsql
as $$
begin
  new.code := upper(trim(new.code));
  return new;
end;
$$;

create trigger influenceurs_uppercase_code_trigger
  before insert or update of code on public.influenceurs
  for each row
  execute function public.influenceurs_uppercase_code();

alter table public.influenceurs enable row level security;
alter table public.commissions enable row level security;

create policy "authenticated_read_influenceurs"
  on public.influenceurs
  for select
  using (auth.role() = 'authenticated');

create policy "authenticated_read_commissions"
  on public.commissions
  for select
  using (auth.role() = 'authenticated');

-- Les insertions et mises à jour passent par SUPABASE_SERVICE_ROLE_KEY côté serveur (bypass RLS).
