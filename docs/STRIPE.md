# Stripe — Bon cadeau Cueva Thalía

## Flux

1. Le visiteur remplit le formulaire sur `/bon-cadeau` (modal « Commander »).
2. `POST /api/stripe/checkout` crée une session **Stripe Checkout** (EUR) et renvoie l’URL de paiement.
3. Après paiement, redirection vers `/bon-cadeau/merci?session_id=…`.
4. Stripe appelle `POST /api/stripe/webhook` (`checkout.session.completed`) → journalisation + hooks futurs (PDF, e-mail, Supabase).

## Variables d’environnement

| Variable | Type | Description |
|----------|------|-------------|
| `STRIPE_SECRET_KEY` | Secret | Clé secrète `sk_test_…` (dev) ou `sk_live_…` (prod) |
| `STRIPE_WEBHOOK_SECRET` | Secret | Secret du endpoint webhook `whsec_…` |

Montants par défaut (modifiables via variables optionnelles, en **centimes**) :

| Format | Défaut |
|--------|--------|
| 1 nuit semaine | 200 € |
| 1 nuit week-end | 250 € |
| 2 nuits | 400 € |
| Montant libre | 50 € – 2 000 € |

## Configuration Stripe Dashboard

### 1. Clés API

- Mode **test** pour le développement local.
- Mode **live** uniquement en production, après validation gestor (TVA, facturation).

### 2. Webhook

Créer un endpoint :

- **URL prod** : `https://cueva-thalia.com/api/stripe/webhook`
- **Événements** : `checkout.session.completed`
- Copier le **Signing secret** → `STRIPE_WEBHOOK_SECRET` sur Netlify.

### 3. Développement local (Stripe CLI)

```bash
stripe login
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

Utiliser le `whsec_…` affiché par la CLI dans `.env.local`.

Carte de test : `4242 4242 4242 4242`, date future, CVC quelconque.

## Netlify

Site settings → Environment variables :

- `STRIPE_SECRET_KEY` → **Secret**
- `STRIPE_WEBHOOK_SECRET` → **Secret**

Redéployer après ajout des variables.

## À brancher ensuite (hors scope actuel)

- Génération PDF (`pdf-lib`) + envoi e-mail (Resend)
- Table Supabase `bons_cadeaux` + validation du code à la réservation
- TVA / facturation conforme (gestor)

Voir `lib/gift-voucher/fulfill.ts`.
