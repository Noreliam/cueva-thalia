# Base de données newsletter — Supabase

Les emails saisis dans les pop-ups promo (code **WELCOME10**) sont enregistrés dans la table `newsletter_subscribers`.

## Mise en place (une fois)

1. Créer un projet sur [supabase.com](https://supabase.com) — région **EU** (ex. Francfort).
2. **SQL Editor** → coller et exécuter le fichier :
   `supabase/migrations/20250629000000_newsletter_subscribers.sql`
3. **Project Settings → API** → copier l’URL et les clés dans `.env.local` :

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

4. Redéployer le site (Netlify) avec les mêmes variables.

## Accès Manon

### Option A — Supabase (recommandé, immédiat)

1. **Project Settings → Team** → inviter Manon avec le rôle **Developer** ou **Owner**.
2. Elle se connecte sur supabase.com → son projet → **Table Editor** → `newsletter_subscribers`.
3. Elle peut consulter, filtrer et **exporter en CSV** depuis l’interface Supabase.

### Option B — Dashboard site

Page **https://cueva-thalia.com/dashboard/newsletter** (liste + export CSV), une fois l’authentification dashboard branchée.

## Données enregistrées

| Colonne | Description |
|---------|-------------|
| `email` | Adresse du client |
| `locale` | Langue du site (fr / es / en) |
| `source` | `popup_welcome` ou `popup_exit` |
| `welcome_code` | Code promo envoyé (WELCOME10) |
| `subscribed_at` | Date d’inscription |
| `unsubscribed_at` | NULL tant que l’inscription est active |

Les doublons d’email sont ignorés (mise à jour de la ligne existante).
