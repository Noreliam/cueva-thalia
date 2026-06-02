# Sécurité — Cueva Thalía

Mesures implémentées dans le code et actions restantes côté infrastructure.

## Déjà en place (code)

- En-têtes HTTP de sécurité (HSTS, CSP, X-Frame-Options, Referrer-Policy, Permissions-Policy)
- Proxy Next.js : blocage de chemins sensibles (`/.env`, `/.git`, `/dashboard`, etc.)
- Formulaires protégés : honeypot, Cloudflare Turnstile, rate limiting (5 req / 15 min / IP)
- Validation serveur stricte (Zod + taille max du body)
- Logs sans données personnelles complètes
- `robots.txt` et `sitemap.xml` générés correctement
- Dashboard inaccessible (404) tant que l’auth Supabase n’est pas branchée

## Variables d’environnement requises en production (Netlify)

```env
NEXT_PUBLIC_SITE_URL=https://cueva-thalia.com
NEXT_PUBLIC_TURNSTILE_SITE_KEY=<clé Cloudflare Turnstile>
TURNSTILE_SECRET_KEY=<secret Cloudflare Turnstile>
```

**Netlify — important :**
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` → variable **normale** (pas « secret ») : elle est publique dans le JS client
- `TURNSTILE_SECRET_KEY` → variable **secrète** uniquement

Clés de test Cloudflare (dev uniquement) :
- Site : `1x00000000000000000000AA`
- Secret : `1x0000000000000000000000000000000AA`

## Actions manuelles recommandées (hors code)

### 1. E-mail — priorité haute

Dans le DNS du domaine `cueva-thalia.com` :

1. **SPF** : passer de `~all` à `-all`
   ```
   v=spf1 include:_spf.google.com -all
   ```

2. **DMARC** (record TXT sur `_dmarc.cueva-thalia.com`) :
   ```
   v=DMARC1; p=quarantine; rua=mailto:contact@cueva-thalia.com; pct=100
   ```
   Après 2 semaines sans problème, durcir vers `p=reject`.

3. **Google Workspace** : activer la **2FA obligatoire** pour `contact@cueva-thalia.com`.

### 2. Cloudflare (recommandé)

Mettre le domaine derrière Cloudflare (plan gratuit) pour :
- WAF et protection DDoS
- Rate limiting additionnel sur `/api/forms/*`
- Turnstile déjà intégré dans le code

### 3. Netlify

- Limiter les accès au dashboard Netlify (2FA sur le compte)
- Variables d’environnement : ne jamais committer `.env.local`
- Activer les alertes de déploiement

### 4. Avant mise en prod du dashboard / Stripe / Smoobu

- Supabase Auth + MFA obligatoire
- Row Level Security sur toutes les tables
- Webhooks Stripe/Smoobu avec vérification de signature
- Rotation des clés API tous les 90 jours

### 5. Monitoring

- UptimeRobot ou Better Stack (alerte si site down)
- Alertes Stripe sur chaque transaction
- `npm audit` régulier + Dependabot

## Fichiers clés

| Fichier | Rôle |
|---|---|
| `lib/security/form-handler.ts` | Guard central des formulaires |
| `lib/security/headers.ts` | En-têtes CSP et sécurité |
| `lib/security/rate-limit.ts` | Limitation par IP |
| `lib/security/turnstile.ts` | Vérification Turnstile |
| `proxy.ts` | Filtrage des requêtes + i18n |
| `netlify.toml` | En-têtes au niveau CDN |
