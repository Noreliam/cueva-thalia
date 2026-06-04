# Stripe + Booking Integration Plan — Cueva Thalía

## 📋 Objectif
Remplacer le widget Smoobu (iframe) par un formulaire de réservation custom qui :
- Synchronise les **disponibilités depuis Smoobu**
- Traite les paiements via **Stripe**
- Élimine les **commissions de plateforme**
- Gère les réservations confirmées

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                  Cueva Thalía Website                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐       ┌──────────────────┐             │
│  │ Booking Form     │       │ Availability     │             │
│  │ (React Component)├──────→│ Calendar         │             │
│  └──────────────────┘       │ (Smoobu API)     │             │
│           │                 └──────────────────┘             │
│           │                                                   │
│           ├─→ User selects dates & confirms guest count      │
│           ├─→ Form validates via Turnstile                   │
│           └─→ POST /api/stripe/booking/checkout              │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              Backend Processing                        │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ 1. Validate dates against Smoobu availability          │  │
│  │ 2. Calculate total price (nights × rate)               │  │
│  │ 3. Create Stripe Checkout Session                      │  │
│  │ 4. Return checkout URL to frontend                     │  │
│  └────────────────────────────────────────────────────────┘  │
│           │                                                   │
└───────────┼───────────────────────────────────────────────────┘
            │
            └──→ Redirect to Stripe Checkout
                 (Customer enters payment details)
                 
     ┌──────────────────────────────────┐
     │     Stripe Dashboard             │
     │   (Payment Processing)           │
     │   - Collect card details         │
     │   - Process payment              │
     │   - Send webhook: checkout.      │
     │     session.completed            │
     └──────────────────────────────────┘
            │
            └──→ Webhook: /api/stripe/webhook/booking
                 
     ┌──────────────────────────────────┐
     │  Backend Fulfillment             │
     │  ─────────────────────────────── │
     │  1. Create Booking Record        │
     │  2. Send confirmation email      │
     │  3. Optionally: Sync to Smoobu   │
     │     (mark dates as blocked)      │
     │  4. Redirect to success page     │
     └──────────────────────────────────┘
```

---

## 📦 Phase 1 : Configuration Stripe

### A. Setup des clés Stripe

**Accès au Dashboard** : https://dashboard.stripe.com/apikeys

**Variables à récupérer** :
```env
STRIPE_SECRET_KEY=sk_live_xxxxx (ou sk_test_xxxxx en dev)
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx (ou pk_test_xxxxx)
```

**⚠️ Sécurité** :
- `STRIPE_SECRET_KEY` : **JAMAIS** committer
- `STRIPE_WEBHOOK_SECRET` : **JAMAIS** committer
- Stocker uniquement dans `.env.local` (git-ignored)
- En prod : variables Netlify secrets

### B. Setup du Webhook Stripe

**URL Endpoint** : `https://cueva-thalia.com/api/stripe/webhook/booking`

**Events to listen** :
- `checkout.session.completed` (paiement réussi)
- `charge.dispute.created` (litige client)

**Test localement** :
```bash
# Installer Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks en local
stripe listen --forward-to http://localhost:3000/api/stripe/webhook/booking

# Les clés de test s'affichent → copier le STRIPE_WEBHOOK_SECRET
```

---

## 🎨 Phase 2 : Frontend — Booking Form

### A. Créer le composant personnalisé

**Fichier** : `components/booking/BookingForm.tsx`

**Caractéristiques** :
```tsx
'use client';

import { useState } from 'react';
import { BookingCalendar } from '@/components/booking/BookingCalendar';
import { BookingDetails } from '@/components/booking/BookingDetails';
import { useBookingValidation } from '@/hooks/useBookingValidation';

export function BookingForm() {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // ... form logic
}
```

### B. Intégration du calendrier (Smoobu availability)

Options :
1. **Smoobu Calendar Widget** (keep current) → display only
2. **Custom calendar** (fetch via API)
3. **Hybrid** : Show Smoobu dates in custom UI

**Recommandé** : Hybrid approach
- Fetch disponibilités depuis Smoobu API
- Afficher dans custom calendar React
- Plus de contrôle UX/design

### C. Formulaire de détails

**Champs requis** :
```
- Email (client)
- Nom (client)
- Téléphone
- Date arrivée
- Date départ
- Nombre d'invités
- Message spécial (optionnel)
- Accord conditions générales (checkbox)
```

**Validation** :
- Vérifier dates via Smoobu
- Vérifier capacité max (8 personnes)
- Vérifier ≥ 2 nuits minimum (?)
- Turnstile CAPTCHA

---

## 🔧 Phase 3 : Backend — Routes API

### A. Route de Checkout `/api/stripe/booking/checkout`

```typescript
// POST /api/stripe/booking/checkout

interface CheckoutRequest {
  email: string;
  name: string;
  phone: string;
  checkInDate: string; // ISO date
  checkOutDate: string; // ISO date
  guestCount: number;
  specialRequests?: string;
  turnstileToken: string;
}

interface CheckoutResponse {
  ok: boolean;
  url?: string; // Stripe checkout URL
  error?: string;
}
```

**Processus** :
1. Valider Turnstile
2. Vérifier disponibilité Smoobu
3. Calculer prix (nuits × tarif)
4. Créer Session Stripe
5. Retourner checkout URL

**Implémentation** :
```typescript
export async function POST(request: Request) {
  // 1. Parse & validate request
  const body = await request.json();
  const parsed = bookingCheckoutSchema.parse(body);
  
  // 2. Check Turnstile
  const turnstileOk = await verifyTurnstileToken(
    parsed.turnstileToken,
    getClientIpFromRequest(request)
  );
  if (!turnstileOk) return error403();
  
  // 3. Verify Smoobu availability
  const availability = await checkSmoobuAvailability({
    checkIn: parsed.checkInDate,
    checkOut: parsed.checkOutDate,
  });
  if (!availability.available) return error400('Dates not available');
  
  // 4. Calculate price
  const nights = calculateNights(
    parsed.checkInDate,
    parsed.checkOutDate
  );
  const pricing = calculateBookingPrice(nights, parsed.guestCount);
  
  // 5. Create Stripe session
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: parsed.email,
    line_items: [{
      quantity: 1,
      price_data: {
        currency: 'eur',
        unit_amount: pricing.amountCents,
        product_data: {
          name: `Cueva Thalía — ${nights} nuit(s)`,
          description: `${parsed.checkInDate} → ${parsed.checkOutDate}`,
        },
      },
    }],
    metadata: {
      bookingId: generateBookingId(),
      guestEmail: parsed.email,
      guestName: parsed.name,
      guestPhone: parsed.phone,
      checkInDate: parsed.checkInDate,
      checkOutDate: parsed.checkOutDate,
      guestCount: String(parsed.guestCount),
      specialRequests: parsed.specialRequests ?? '',
      amountCents: String(pricing.amountCents),
    },
    success_url: `${baseUrl}/sejourner?booking_success=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/sejourner?booking_canceled=1`,
  });
  
  return NextResponse.json({ ok: true, url: session.url });
}
```

### B. Webhook `/api/stripe/webhook/booking`

```typescript
// POST /api/stripe/webhook/booking

export async function POST(request: Request) {
  const signature = request.headers.get('stripe-signature');
  if (!signature) return error400('Missing signature');
  
  const payload = await request.text();
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return error400('Invalid signature');
  }
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === 'paid') {
      await handleBookingConfirmation(session);
    }
  }
  
  return NextResponse.json({ received: true });
}

async function handleBookingConfirmation(session: Stripe.Checkout.Session) {
  const metadata = session.metadata!;
  
  // 1. Store booking in database (Supabase)
  const booking = await createBooking({
    bookingId: metadata.bookingId,
    guestEmail: metadata.guestEmail,
    guestName: metadata.guestName,
    guestPhone: metadata.guestPhone,
    checkInDate: metadata.checkInDate,
    checkOutDate: metadata.checkOutDate,
    guestCount: parseInt(metadata.guestCount),
    specialRequests: metadata.specialRequests,
    stripeSessionId: session.id,
    stripePaymentIntentId: session.payment_intent as string,
    amountCents: parseInt(metadata.amountCents),
    status: 'confirmed',
  });
  
  // 2. Send confirmation email to guest
  await sendEmail({
    to: metadata.guestEmail,
    template: 'booking-confirmation',
    data: {
      guestName: metadata.guestName,
      checkInDate: metadata.checkInDate,
      checkOutDate: metadata.checkOutDate,
      guestCount: metadata.guestCount,
      bookingId: metadata.bookingId,
    },
  });
  
  // 3. Send notification to Manon
  await sendEmail({
    to: 'contact@cueva-thalia.com',
    template: 'new-booking-admin',
    data: { ...booking },
  });
  
  // 4. (Optional) Block dates in Smoobu via API
  // This depends on Smoobu's API capabilities
  // await blockSmoobuDates(checkInDate, checkOutDate);
}
```

---

## 💾 Phase 4 : Database — Store Bookings

### A. Supabase Table Schema

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Booking info
  booking_id TEXT UNIQUE NOT NULL, -- Human-readable ID
  status TEXT NOT NULL DEFAULT 'pending', -- pending, confirmed, cancelled
  
  -- Guest info
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  guest_count INT NOT NULL,
  
  -- Dates
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  nights_count INT NOT NULL,
  
  -- Payment
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  amount_cents INT NOT NULL,
  payment_status TEXT DEFAULT 'pending', -- pending, paid, refunded
  
  -- Notes
  special_requests TEXT,
  admin_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT now(),
  confirmed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT now(),
  
  -- Indexes
  INDEX idx_check_in (check_in_date),
  INDEX idx_status (status),
  INDEX idx_email (guest_email)
);

-- Webhook logs (for debugging)
CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  stripe_event_id TEXT,
  payload JSONB,
  processed_at TIMESTAMP DEFAULT now(),
  error TEXT
);
```

---

## 📨 Phase 5 : Email Templates

### A. Confirmation Email (Guest)

**Template** : `emails/booking-confirmation.tsx`

```html
Subject: Confirmation de votre réservation #[BOOKING_ID]

Bonjour [GUEST_NAME],

Nous vous confirmons votre réservation à Cueva Thalía :

📅 Check-in : [CHECK_IN_DATE]
📅 Check-out : [CHECK_OUT_DATE]
👥 Nombre d'invités : [GUEST_COUNT]
💶 Montant payé : [AMOUNT_EUR]

Référence booking : [BOOKING_ID]

---

Ce qui est inclus :
✓ Accès complet à la Cueva
✓ Jacuzzi intérieur chauffé
✓ Jardin privatif
✓ WiFi haut débit
✓ Petit-déjeuner (en option)

Questions ? Contactez-nous :
📞 WhatsApp : +34 657 077 910
📧 Email : contact@cueva-thalia.com

À bientôt,
Manon & l'équipe Cueva Thalía
```

### B. Admin Notification

**Template** : `emails/new-booking-admin.tsx`

```html
Subject: ✨ Nouvelle réservation #[BOOKING_ID]

Manon,

Nouvelle réservation confirmée via Stripe :

👤 Client : [GUEST_NAME]
📧 Email : [GUEST_EMAIL]
📞 Tél : [GUEST_PHONE]

📅 Check-in : [CHECK_IN_DATE]
📅 Check-out : [CHECK_OUT_DATE]
👥 Invités : [GUEST_COUNT]
💶 Montant : [AMOUNT_EUR]
🔑 Ref Booking : [BOOKING_ID]

Message spécial :
[SPECIAL_REQUESTS]

---

Action : Bloquer les dates dans Smoobu (si pas automatisé)
Lien admin : [ADMIN_LINK]
```

---

## 🧪 Phase 6 : Pricing Logic

### A. Tarification configurée (Cueva Thalía Réelle)

**Fichier** : `lib/booking/pricing.ts`

```typescript
// Tarifs officiels Cueva Thalía
const BASE_RATES = {
  peakDay: 250,  // EUR/nuit: vendredi, samedi, jours fériés
  offDay: 200,   // EUR/nuit: dimanche-jeudi (hors jours fériés)
};

// Limites de réservation
const MAX_GUESTS_ONLINE = 4;    // Réservation en ligne
const MAX_GUESTS_TOTAL = 16;    // Capacité max avec couchages supplémentaires
const MIN_NIGHTS = 1;           // Minimum confirmer avec Manon
const DEPOSIT = 150;            // EUR (caution optionnelle)

export function calculateBookingPrice(
  checkIn: Date,
  checkOut: Date,
  guestCount: number
) {
  const nights = calculateNights(checkIn, checkOut);
  
  if (nights < MIN_NIGHTS) {
    throw new Error(`Minimum ${MIN_NIGHTS} night required`);
  }
  
  // Online booking jusqu'à 4 personnes
  // Au-delà: devis personnalisé via WhatsApp/email
  if (guestCount > MAX_GUESTS_ONLINE) {
    throw new Error(
      `Online booking for up to ${MAX_GUESTS_ONLINE} guests. For ${guestCount} guests, please contact us via WhatsApp or email.`
    );
  }
  
  let total = 0;
  let currentDate = new Date(checkIn);
  
  while (currentDate < checkOut) {
    // Vendredi (5) ou Samedi (6) = tarif peak
    const isPeakDay = [5, 6].includes(currentDate.getDay());
    const rate = isPeakDay ? BASE_RATES.peakDay : BASE_RATES.offDay;
    total += rate;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // TODO: Ajouter tarifs progressifs pour plusieurs nuits
  // Exemple: -5% pour 7+ nuits, -10% pour 14+ nuits
  
  return {
    nights,
    totalEUR: total,
    amountCents: Math.round(total * 100),
    priceBreakdown: {
      baseTotal: total,
      discount: 0, // Tarifs progressifs non implémentés
      final: total,
    },
  };
}
```

---

## 🔐 Phase 7 : Security Checklist

- [ ] Rate limiting on checkout endpoint (DoS protection)
- [ ] CAPTCHA (Turnstile) on booking form
- [ ] Webhook signature verification (Stripe)
- [ ] Encrypt sensitive data (email, phone)
- [ ] CORS configuration (only cueva-thalia.com)
- [ ] Content Security Policy headers
- [ ] SQL injection prevention (use ORM)
- [ ] Input validation on all fields
- [ ] GDPR compliance (data retention policy)

---

## 📋 Phase 8 : Stripe Integration Checklist

### Environment Setup
- [ ] Get Stripe API keys (test & live)
- [ ] Add keys to `.env.local`
- [ ] Add keys to Netlify secrets (production)
- [ ] Configure webhook endpoint in Stripe Dashboard
- [ ] Test webhook locally with Stripe CLI

### Code Changes
- [ ] Create `/api/stripe/booking/checkout` route
- [ ] Create `/api/stripe/webhook/booking` route
- [ ] Create booking schema & validation
- [ ] Create pricing logic
- [ ] Create database schema (Supabase)
- [ ] Create booking form component
- [ ] Create email templates

### Frontend
- [ ] Update `/app/sejourner/page.tsx` to use new form
- [ ] Replace SmoobuWidget with BookingForm
- [ ] Add success/cancelled pages
- [ ] Add loading states
- [ ] Add error handling

### Testing
- [ ] Test checkout flow (test card: 4242 4242 4242 4242)
- [ ] Test webhook reception
- [ ] Test email sending
- [ ] Test date validation
- [ ] Test price calculation
- [ ] Test in different locales (fr/es/en)

### Deployment
- [ ] Review security checklist
- [ ] Test in staging
- [ ] Migrate to live Stripe keys
- [ ] Monitor webhook logs
- [ ] Set up alerts for failed webhooks

---

## 💡 Decisions à prendre

### 1. Smoobu Integration
- **Option A** : Keep Smoobu widget visible (read-only calendar)
- **Option B** : Fetch availability via Smoobu API
- **Option C** : Manual availability management (independent calendar)

**Recommandation** : Option B (API) pour meilleur contrôle UX

### 2. Booking Confirmation
- Email automatique générée par ?
- WhatsApp notification à Manon ?
- Slack webhook ?

**Recommandation** : Email + WhatsApp via Twilio

### 3. Deposit vs Full Payment
- [ ] Full payment required (100%)
- [ ] Deposit only (30%?) - need manual confirmation
- [ ] Free booking (collect payment on site)

**Recommandation** : Full payment online (plus simple)

### 4. Calendar Blocker
- Auto-block Smoobu after confirmation ?
- Manual calendar management ?

**Recommandation** : Manual pour l'instant (évite erreurs sync)

---

## 📞 Support Stripe

- **Docs** : https://stripe.com/docs
- **API Reference** : https://stripe.com/docs/api
- **Dashboard** : https://dashboard.stripe.com
- **Support** : stripe.com/support
- **CLI** : https://stripe.com/docs/stripe-cli

---

## 🚀 Next Steps

1. Créer compte Stripe (test mode)
2. Récupérer clés API
3. Configurer webhook local avec Stripe CLI
4. Implémenter `/api/stripe/booking/checkout`
5. Implémenter `/api/stripe/webhook/booking`
6. Créer BookingForm component
7. Tester end-to-end avec test card
8. Migrer vers live keys
