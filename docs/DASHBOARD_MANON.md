# Dashboard Manon — Spécification & instructions de création

Document de référence pour permettre à **Manon** de gérer son activité **sans passer par le développeur** au quotidien.

**Public cible de ce doc :** développeur web qui implémentera le dashboard.  
**Public cible du dashboard :** Manon (propriétaire Cueva Thalía).

---

## 1. Objectif

Manon doit pouvoir, depuis **https://cueva-thalia.com/dashboard** :

| Besoin | Aujourd'hui | Avec dashboard |
|--------|-------------|----------------|
| Voir les réservations payées sur le site | Emails + Stripe + Smoobu (3 outils) | Vue unique + liens rapides |
| Modifier les tarifs promo (Noël, basse saison…) | Éditer `data/pricing-overrides.json` + redéploiement | Interface simple dates + prix |
| Voir les inscrits newsletter / code WELCOME10 | Rien (emails seulement) | Liste exportable |
| Traiter les demandes (événements, workshops, contact) | `console.log` côté serveur | Liste + statut traité |
| Vérifier les emails 48 h avant arrivée | Automatique (cron) si déployé | Statut « envoyé / en attente » |
| Annulations / remboursements | Stripe Dashboard + Smoobu manuellement | Lien guidé + notes internes |

**Ce que le dashboard ne remplace pas (volontairement) :**

- **Calendrier principal** → Smoobu reste la source de vérité pour les disponibilités Airbnb/Booking + sync iCal.
- **Remboursements Stripe** → action dans [Stripe Dashboard](https://dashboard.stripe.com) (sécurité PCI).
- **Comptabilité / factures légales** → gestor ou outil comptable externe.

---

## 2. État actuel du code (juin 2026)

### Déjà en place (site public)

- Réservation directe : calendrier → voyageurs → Stripe Checkout (`/sejourner`)
- Sync Smoobu API (si `SMOOBU_ENABLE_API_SYNC=true`) + flux iCal
- Emails SMTP (Nodemailer / Gmail) :
  - confirmation client (`lib/email/booking-confirmation.ts`)
  - alerte Manon à chaque réservation (`lib/email/booking-notification-admin.ts`)
  - pré-arrivée 48 h (`lib/email/pre-arrival.ts` + cron `/api/cron/pre-arrival-emails`)
  - bienvenue newsletter WELCOME10 (`lib/email/newsletter-welcome.ts`)
- Tarifs dynamiques via fichier JSON (`data/pricing-overrides.json` + `lib/booking/pricing-overrides.ts`)
- Pop-ups newsletter (`components/marketing/NewsletterPopups.tsx`)
- Politique d'annulation à jour (`lib/booking/cancellation-policy.ts`)

### Dashboard existant (placeholder)

- Routes : `app/dashboard/page.tsx`, `app/dashboard/layout.tsx` uniquement
- Auth : cookie `ct_dashboard_session` prévu mais **non branché**
- Modules listés en dur (liens vers pages **non créées** : `/dashboard/demandes`, `/dashboard/paiements`, etc.)
- Supabase : packages installés (`@supabase/ssr`, `@supabase/supabase-js`) mais **aucune table, aucune auth**

### Fichiers clés à connaître

```
app/dashboard/                          → shell à compléter
lib/booking/fulfill.ts                  → hook post-paiement (Smoobu + emails)
lib/booking/stripe-bookings.ts          → lecture réservations via API Stripe
lib/booking/pricing-overrides.ts        → logique tarifs promo
app/api/stripe/webhook/booking/route.ts → webhook Stripe réservations
app/api/forms/*/route.ts                → formulaires (TODO Supabase)
netlify/functions/pre-arrival-emails.mjs → cron horaire Netlify
data/pricing-overrides.json             → tarifs promo (à migrer en BDD)
```

---

## 3. Architecture recommandée

```
┌─────────────────────────────────────────────────────────────┐
│  Manon — navigateur → /dashboard (Supabase Auth + MFA)      │
└───────────────────────────────┬─────────────────────────────┘
                                │
┌───────────────────────────────▼─────────────────────────────┐
│  Next.js App Router                                         │
│  • Server Components + Route Handlers protégés              │
│  • middleware : vérifier session Supabase sur /dashboard/*  │
└───────┬───────────────────────────────┬─────────────────────┘
        │                               │
        ▼                               ▼
┌───────────────┐               ┌───────────────────┐
│  Supabase     │               │  Services externes │
│  • Auth       │               │  • Stripe API      │
│  • Postgres   │               │  • Smoobu API      │
│  • RLS        │               │  • SMTP (emails)   │
└───────────────┘               └───────────────────┘
```

**Pourquoi Supabase (déjà dans le projet) :**

- Auth email + mot de passe + **MFA** (recommandé dans `docs/SECURITY.md`)
- Postgres pour stocker réservations, demandes, tarifs, newsletter
- Row Level Security : seul le compte Manon accède aux données
- Pas de serveur à maintenir

---

## 4. Compte & accès Manon

### Création du compte (une fois, par le dev)

1. Créer un projet Supabase (région EU — ex. Francfort).
2. Auth → Users → **Invite user** : email de Manon (ex. `manon@…` ou `contact@cueva-thalia.com`).
3. Activer **MFA (TOTP)** obligatoire pour ce compte.
4. Variables Netlify :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...   # secret — jamais côté client
```

5. Implémenter login `/dashboard/login` (email + mot de passe Supabase).
6. Middleware : rediriger vers `/dashboard/login` si pas de session.

### Expérience Manon (quotidien)

1. Aller sur **https://cueva-thalia.com/dashboard**
2. Se connecter (email + mot de passe + code MFA téléphone)
3. Utiliser les modules — **pas de déploiement, pas de JSON, pas de terminal**

---

## 5. Schéma base de données Supabase

Exécuter dans l’éditeur SQL Supabase (adapter + compléter le schéma de `docs/STRIPE_BOOKING_INTEGRATION.md`).

### 5.1 Table `bookings`

Stocker **chaque réservation payée sur le site** (alimentée par le webhook Stripe).

```sql
create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  booking_id text unique not null,
  status text not null default 'confirmed',
  guest_name text not null,
  guest_email text not null,
  guest_phone text,
  guest_count int not null,
  check_in_date date not null,
  check_out_date date not null,
  nights_count int not null,
  amount_cents int not null,
  locale text not null default 'es',
  stripe_session_id text unique,
  stripe_payment_intent_id text,
  smoobu_reservation_id int,
  special_requests text,
  admin_notes text,
  pre_arrival_email_sent_at timestamptz,
  created_at timestamptz default now(),
  confirmed_at timestamptz,
  updated_at timestamptz default now()
);

create index bookings_check_in_idx on public.bookings (check_in_date);
create index bookings_status_idx on public.bookings (status);
```

**Modification code :** dans `lib/booking/fulfill.ts`, après paiement confirmé → `insert` ou `upsert` dans `bookings`.

### 5.2 Table `pricing_periods`

Remplace `data/pricing-overrides.json` pour édition par Manon.

```sql
create table public.pricing_periods (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  start_date date not null,
  end_date date not null,
  peak_day_rate int not null,   -- €/nuit ven–dim & fériés
  off_day_rate int not null,    -- €/nuit lun–jeu
  note text,
  active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**Modification code :** `lib/booking/pricing-overrides.ts` lit Supabase en priorité, fallback JSON en dev.

### 5.3 Table `newsletter_subscribers`

```sql
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  locale text not null default 'es',
  source text not null default 'popup',  -- popup_welcome | popup_exit
  welcome_code text default 'WELCOME10',
  subscribed_at timestamptz default now(),
  unsubscribed_at timestamptz
);
```

**Modification code :** `app/api/forms/newsletter/route.ts` → insert + email (déjà partiellement fait).

### 5.4 Table `demandes`

Formulaires contact, événements, workshops, bon cadeau.

```sql
create type demande_type as enum ('contact', 'evenement', 'workshop', 'bon_cadeau');
create type demande_status as enum ('nouvelle', 'en_cours', 'traitee', 'archivee');

create table public.demandes (
  id uuid primary key default gen_random_uuid(),
  type demande_type not null,
  status demande_status not null default 'nouvelle',
  payload jsonb not null,
  guest_email text,
  guest_name text,
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

### 5.5 Row Level Security (RLS)

```sql
alter table public.bookings enable row level security;
alter table public.pricing_periods enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.demandes enable row level security;

-- Politique : utilisateur authentifié uniquement (Manon)
create policy "admin_all" on public.bookings
  for all using (auth.role() = 'authenticated');
-- Répéter pour chaque table
```

Les **webhooks Stripe** utilisent `SUPABASE_SERVICE_ROLE_KEY` (bypass RLS) côté serveur.

---

## 6. Modules du dashboard — priorités

### Phase 1 — Indispensable (autonomie réservations)

| Route | Fonction | Détail |
|-------|----------|--------|
| `/dashboard/login` | Connexion | Supabase Auth + MFA |
| `/dashboard` | Accueil | Prochaines arrivées (7 j), demandes non lues, raccourcis |
| `/dashboard/reservations` | Liste réservations | Filtres : à venir / passées / annulées. Colonnes : dates, voyageurs, montant, ref, email 48 h |
| `/dashboard/reservations/[id]` | Détail | Notes admin, lien Smoobu, lien Stripe, statut email pré-arrivée |
| `/dashboard/tarifs` | Tarifs promo | CRUD périodes (dates + prix semaine/week-end). Aperçu impact calendrier |

### Phase 2 — Confort quotidien

| Route | Fonction |
|-------|----------|
| `/dashboard/demandes` | File des formulaires site |
| `/dashboard/newsletter` | Liste inscrits + export CSV |
| `/dashboard/emails` | Log envois (confirmation, 48 h, alertes) — lecture seule |

### Phase 3 — Optionnel

| Route | Fonction |
|-------|----------|
| `/dashboard/paiements` | Synthèse Stripe (liens dashboard Stripe) |
| `/dashboard/documents` | Modèles WhatsApp, FAQ interne |
| `/dashboard/marketing` | Liens GA4 / GSC |

---

## 7. Écrans détaillés (wireframe fonctionnel)

### 7.1 Accueil `/dashboard`

- **Bloc « Arrivées cette semaine »** : nom, dates, nb voyageurs, téléphone, bouton WhatsApp
- **Bloc « Emails 48 h »** : réservations dans la fenêtre 46–50 h sans `pre_arrival_email_sent_at`
- **Bloc « Demandes »** : compteur nouvelles demandes
- **Actions rapides** : « Ouvrir Smoobu », « Ouvrir Stripe », « Ajouter une promo tarif »

### 7.2 Réservations `/dashboard/reservations`

Table triable :

| Colonne | Source |
|---------|--------|
| Référence | `booking_id` |
| Voyageur | `guest_name` |
| Email / Tél | `guest_email`, `guest_phone` |
| Arrivée → Départ | dates |
| Voyageurs | `guest_count` |
| Montant | `amount_cents` |
| Langue | `locale` |
| Smoobu | lien si `smoobu_reservation_id` |
| Email 48 h | ✓ / en attente / erreur |

**Actions Manon (sans code) :**

- Ajouter une **note interne** (ex. « chien prévu », « arrivée tardive »)
- Copier le message WhatsApp type
- Ouvrir Smoobu / Stripe dans un nouvel onglet

**Actions qu’elle ne fait PAS dans le dashboard :**

- Rembourser → Stripe Dashboard (lien direct avec `payment_intent_id`)
- Bloquer des dates → Smoobu

### 7.3 Tarifs `/dashboard/tarifs`

Formulaire :

- Nom de la promo (ex. « Noël 2026 »)
- Date début / fin
- Prix lun–jeu (€)
- Prix ven–dim & fériés (€)
- Note interne (optionnel)
- Actif / inactif

**Règles métier à afficher à Manon :**

- Tarifs de base hors promo : **200 €** lun–jeu, **250 €** ven–dim & fériés
- Une période promo **écrase** le tarif de base pour chaque nuit concernée
- Les réservations déjà payées ne sont **pas** recalculées

### 7.4 Demandes `/dashboard/demandes`

- Onglets : Contact | Événements | Workshops | Bon cadeau
- Statut : Nouvelle → En cours → Traitée
- Répondre par email (mailto:) ou WhatsApp

---

## 8. Modifications code à prévoir (checklist dev)

### Auth & sécurité

- [ ] `lib/supabase/server.ts` + `lib/supabase/client.ts` (helpers SSR)
- [ ] `middleware.ts` : protéger `/dashboard/*` sauf `/dashboard/login`
- [ ] Retirer le placeholder cookie `ct_dashboard_session`
- [ ] `robots: noindex` déjà OK sur dashboard
- [ ] Rate limit sur `/dashboard/login`

### Sync données

- [ ] Webhook Stripe → upsert `bookings` (`fulfill.ts`)
- [ ] Cron 48 h → mettre à jour `pre_arrival_email_sent_at` en BDD (en plus metadata Stripe)
- [ ] Formulaires → insert `demandes`
- [ ] Newsletter API → insert `newsletter_subscribers`
- [ ] Pricing → lire `pricing_periods` Supabase

### API dashboard (Route Handlers protégés)

```
app/api/dashboard/pricing/route.ts      GET, POST, PATCH, DELETE
app/api/dashboard/bookings/route.ts     GET (liste + filtres)
app/api/dashboard/bookings/[id]/route.ts PATCH (notes, statut)
app/api/dashboard/demandes/route.ts     GET, PATCH
app/api/dashboard/newsletter/route.ts   GET
```

Chaque handler :

1. Vérifier session Supabase (`createServerClient` + cookies)
2. Rejeter 401 si non authentifié
3. Utiliser service role **uniquement** dans webhooks/cron, pas dans routes dashboard

### UI

- [ ] Layout dashboard commun : sidebar + header (nom Manon, déconnexion)
- [ ] Composants réutilisables : `DashboardTable`, `DashboardCard`, `StatusBadge`
- [ ] Style : réutiliser classes `.dashboard-*` dans `app/site.css`
- [ ] **Langue UI dashboard : français** (Manon)

---

## 9. Variables d'environnement (complément)

```env
# Supabase (dashboard)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Déjà en place
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
EMAIL_MANON=                    # alertes réservation (optionnel)
CRON_SECRET=                    # cron emails 48 h
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
SMOOBU_API_KEY=
SMOOBU_ENABLE_API_SYNC=true
```

---

## 10. Guide utilisateur Manon (à mettre dans `/dashboard/aide`)

Contenu suggéré pour une page d’aide intégrée :

### Où gérer quoi ?

| Je veux… | Où aller |
|----------|----------|
| Voir qui arrive et quand | Dashboard → Réservations |
| Changer un prix pour Noël / une promo | Dashboard → Tarifs |
| Voir le calendrier complet (Airbnb, etc.) | [Smoobu](https://login.smoobu.com) |
| Rembourser un client | [Stripe](https://dashboard.stripe.com) → Paiements |
| Répondre à une demande événement | Dashboard → Demandes |
| Voir qui s’est inscrit à la newsletter | Dashboard → Newsletter |

### Réservation reçue — que se passe-t-il ?

1. Le client paie sur le site → email de confirmation au client + **email à Manon**
2. La réservation est créée dans Smoobu (si API activée)
3. **48 h avant l’arrivée** : email automatique (check-in, fianza, règles, Wi-Fi)
4. Manon peut vérifier dans Dashboard → Réservations que l’email 48 h est bien « envoyé »

### Modifier un tarif promo

1. Dashboard → Tarifs → « Ajouter une période »
2. Choisir dates + prix
3. Enregistrer — **effet immédiat** sur le calendrier du site (sans redéploiement)

---

## 11. Plan de mise en œuvre suggéré

| Sprint | Durée estimée | Livrables |
|--------|---------------|-----------|
| **S1 — Fondations** | 2–3 j | Supabase projet + tables + Auth + login + middleware |
| **S2 — Réservations** | 2 j | Webhook → BDD + page liste + détail + accueil |
| **S3 — Tarifs** | 1–2 j | CRUD tarifs + branchement `calculateBookingPrice` |
| **S4 — Demandes & newsletter** | 1–2 j | Formulaires → BDD + pages dashboard |
| **S5 — Finitions** | 1 j | Page aide Manon, tests, doc, MFA |

**Estimation totale :** 7–10 jours dev pour une V1 autonome.

---

## 12. Tests avant remise à Manon

- [ ] Connexion / déconnexion / MFA
- [ ] Impossible d’accéder à `/dashboard/reservations` sans login
- [ ] Réservation test Stripe → visible dans dashboard < 1 min
- [ ] Création promo tarif → prix mis à jour sur `/sejourner` sans redeploy
- [ ] Inscription newsletter pop-up → visible dans dashboard
- [ ] Cron 48 h : statut mis à jour dans dashboard
- [ ] RLS Supabase : accès anonyme refusé sur toutes les tables

---

## 13. Ce qui reste la responsabilité du dev (pas Manon)

- Déploiements Netlify
- Clés API (Stripe, Smoobu, Supabase, CRON_SECRET)
- Évolutions du site (nouvelles pages, SEO)
- Debug si webhook ou cron en échec
- Mises à jour de sécurité

---

## 14. Références dans le repo

| Document | Sujet |
|----------|-------|
| `docs/STRIPE_BOOKING_INTEGRATION.md` | Schéma bookings, webhook |
| `docs/SECURITY.md` | MFA, headers, bonnes pratiques |
| `docs/HANDOFF_WEBDEV.md` | TODO formulaires & auth |
| `promptfinal.md` | Cahier des charges client (emails, pop-ups, annulation…) |
| `data/pricing-overrides.json` | Format actuel des tarifs promo (à migrer) |

---

## 15. Prochaine action recommandée

1. **Déployer d’abord** le code actuel (emails, cron, pop-ups, tarifs JSON) — sans dashboard Manon reste dépendante pour les promos.
2. **Créer le projet Supabase** et les tables (section 5).
3. **Implémenter Phase 1** (auth + réservations + tarifs).
4. **Former Manon** (30 min) avec la page `/dashboard/aide` + accès Smoobu + Stripe.

---

*Document généré pour Cueva Thalía — à mettre à jour au fur et à mesure de l’implémentation.*
