# Handoff pour le Webdev — Cueva Thalía

Ce document liste l'ensemble des intégrations backend et logiques métier qui doivent être finalisées par le développeur web.
Toute la partie "Front-end Public" est terminée.

## 1. Intégration Smoobu
- [ ] Fournir l'ID exact du widget Smoobu.
- [ ] L'ajouter dans `.env` à la variable `NEXT_PUBLIC_SMOOBU_WIDGET_ID`.
- [ ] Le composant `components/SmoobuWidget.tsx` l'utilisera automatiquement.

## 2. Formulaires (Contact, Événements, Retraites, Bon Cadeau)
Les endpoints API (ex: `/api/forms/contact/route.ts`) sont actuellement en mode "placeholder" (Mock).
- [ ] Remplacer les logiques existantes (`console.log`) par un appel vers **Supabase** (pour stocker la demande).
- [ ] Brancher un service d'envoi d'e-mail (Resend, SendGrid, etc.) pour envoyer les notifications à `contact@cueva-thalia.com`.
- [ ] Implémenter la vérification Cloudflare Turnstile côté serveur. ✅ Fait — voir `lib/security/turnstile.ts` et `components/forms/TurnstileField.tsx`

## 3. Dashboard et Auth
- [ ] Créer les routes protégées sous `/dashboard`.
- [ ] Brancher Supabase Auth pour sécuriser ces routes (hors périmètre de l'agence V1).

## 4. Paiement et Acompte (Logique métier)
- [ ] Implémenter la logique des acomptes (si nécessaire hors de Smoobu).
- [ ] Lier Stripe si une interface personnalisée est créée.

## 5. Contenus Légaux et Textes
- [ ] Remplir les pages `/mentions-legales`, `/conditions-generales`, `/politique-annulation` et `/politique-confidentialite`. (Rechercher `{{À COMPLÉTER avec Manon + gestor}}` dans le code).
- [ ] Ajouter les "vrais" textes pour les articles SEO dans `app/[locale]/(public)/articles/`.

## Variables d'environnement nécessaires en Prod
```env
NEXT_PUBLIC_SITE_URL="https://cueva-thalia.com"
NEXT_PUBLIC_DEFAULT_LOCALE="es"
NEXT_PUBLIC_WHATSAPP_NUMBER="34657077910"
NEXT_PUBLIC_SMOOBU_WIDGET_ID="VOTRE_ID_SMOOBU"
NEXT_PUBLIC_PLAUSIBLE_DOMAIN="cueva-thalia.com"
CONTACT_EMAIL="contact@cueva-thalia.com"
TURNSTILE_SITE_KEY="VOTRE_CLE_CLOUD_FLARE"
```
