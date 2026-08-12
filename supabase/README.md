# Base de données — Supabase

## Variables d'environnement (déjà en place sur le site)

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

Ces variables permettent au site de **se connecter** à Supabase. Elles ne créent pas automatiquement les tables : chaque fonctionnalité a sa propre migration SQL à exécuter une fois dans le **SQL Editor** Supabase.

---

## Newsletter (pop-ups WELCOME10)

Table : `newsletter_subscribers`

1. Exécuter : `supabase/migrations/20250629000000_newsletter_subscribers.sql`
2. Accès Manon : **Table Editor** → `newsletter_subscribers`, ou `/dashboard/newsletter`

---

## Programme influenceur (page `/influenceur/rejoindre`)

Tables : `influenceurs`, `commissions`

**Si cette migration n'a pas été exécutée, le formulaire influenceur échoue** même avec les variables Supabase correctes (erreur générique côté visiteur).

1. Exécuter dans l'ordre :
   - `supabase/migrations/20250707100000_influenceurs_commissions.sql`
   - `supabase/migrations/20250707110000_influenceurs_instagram.sql`
2. Vérifier dans **Table Editor** que la table `influenceurs` existe.
3. Suivi des commissions : `/admin/commissions`

---

## Données newsletter

| Colonne | Description |
|---------|-------------|
| `email` | Adresse du client |
| `locale` | Langue du site (fr / es / en) |
| `source` | `popup_welcome` ou `popup_exit` |
| `welcome_code` | Code promo envoyé (WELCOME10) |
| `subscribed_at` | Date d'inscription |
| `unsubscribed_at` | NULL tant que l'inscription est active |

Les doublons d'email sont ignorés (mise à jour de la ligne existante).
