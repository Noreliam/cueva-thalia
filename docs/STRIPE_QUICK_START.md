# Stripe Booking Integration — Quick Start

## ✅ What's Ready

Fichiers créés et prêts à utiliser :

```
lib/booking/
├── schema.ts          ✅ Validation schemas (Zod)
└── pricing.ts         ✅ Pricing logic & calculations

app/api/stripe/
├── booking/
│   └── checkout/route.ts  ✅ POST /api/stripe/booking/checkout
└── webhook/
    └── booking/route.ts   ✅ POST /api/stripe/webhook/booking

components/booking/
└── BookingForm.tsx    ✅ React form component

docs/
├── STRIPE_BOOKING_INTEGRATION.md  (full guide)
└── STRIPE_QUICK_START.md          (this file)
```

---

## 🚀 Implementation Steps

### Step 1: Get Stripe API Keys

1. Go to https://dashboard.stripe.com/apikeys
2. Copy **Publishable Key** (pk_test_xxx or pk_live_xxx)
3. Copy **Secret Key** (sk_test_xxx or sk_live_xxx)
4. Add to `.env.local` :

```env
STRIPE_SECRET_KEY=sk_test_xxxxx  (or sk_live_xxxxx)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx  (or pk_live_xxxxx)
```

### Step 2: Configure Webhook

**Local Development:**

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to your Stripe account
stripe login

# Forward webhooks to local server
stripe listen --forward-to http://localhost:3000/api/stripe/webhook/booking
```

This outputs:
```
Ready! Your webhook signing secret is: whsec_xxxxx
```

Add to `.env.local` :
```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

**Production (Netlify):**

1. Go to Stripe Dashboard → Webhook endpoints
2. Add endpoint: `https://cueva-thalia.com/api/stripe/webhook/booking`
3. Select event: `checkout.session.completed`
4. Copy signing secret → Add to Netlify secrets

### Step 3: Update Environment Variables

Complete `.env.local` :

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx

# Turnstile (already configured?)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=your_key
TURNSTILE_SECRET_KEY=your_secret

# Other existing vars...
```

### Step 4: Test the Checkout Flow

**Using test card:** `4242 4242 4242 4242`

1. Go to `/sejourner`
2. Fill booking form
3. Use test card in Stripe Checkout
4. Check webhook logs in Stripe Dashboard

### Step 5: Add Database Schema (Optional but Recommended)

If using Supabase, create this table:

```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id TEXT UNIQUE NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  guest_count INT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  amount_cents INT NOT NULL,
  special_requests TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now()
);
```

Then update webhook to save bookings:

```typescript
// In webhook handler
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

await supabase.from('bookings').insert({
  booking_id: metadata.bookingId,
  guest_name: metadata.guestName,
  // ... other fields
});
```

### Step 6: Test Webhook Locally

Terminal 1: Run Next.js dev server
```bash
npm run dev
```

Terminal 2: Run Stripe CLI
```bash
stripe listen --forward-to http://localhost:3000/api/stripe/webhook/booking
```

Terminal 3: Trigger a test event
```bash
stripe trigger payment_intent.succeeded
```

Check logs in both terminals.

---

## 📊 Test Scenarios

### Scenario 1: Successful Booking
1. Select dates (minimum 2 nights)
2. Enter guest details
3. Use card: `4242 4242 4242 4242`
4. Confirm payment
5. Check `/sejourner?booking_success=1`

### Scenario 2: Declined Card
1. Use card: `4000 0000 0000 0002`
2. Payment should fail
3. Should redirect to cancel page

### Scenario 3: Webhook Verification
1. Process successful booking
2. Check Stripe Dashboard → Events
3. Look for `checkout.session.completed`
4. Verify webhook was delivered
5. Check NextJS console for logs

### Scenario 4: Multiple Guests
1. Select 6+ guests
2. Price should apply 10% group discount
3. Total should show discount

---

## 💾 Pricing Reference

**Base rates (Cueva Thalía):**
- Lundi-jeudi (off-peak): **€200/night**
- Vendredi, samedi, dimanche (peak): **€250/night**

**Online booking:**
- Maximum: **4 guests** (5+ requires custom quote via WhatsApp/email)
- Minimum: **1 night** (confirm with Manon)
- Caution/Deposit: **€150**
- Progressive rates: Possible for multiple nights (to be defined)

**Total capacity:**
- Standard: 4 guests (queen bed + double sofa bed)
- Maximum: 16 guests with extra mattresses

**Example:**
```
Check-in: 2024-06-21 (Fri) - peak day
Check-out: 2024-06-23 (Sun) - off-peak
Guests: 2

Price calculation:
- Fri (peak): €250
- Sat (peak): €250
- Sun (off-peak): €200
- Total: €700 ✓
```

---

## 🔧 File Structure

```
project/
├── lib/
│   ├── booking/
│   │   ├── schema.ts          # Zod validation
│   │   └── pricing.ts         # Price calculations
│   ├── stripe/
│   │   └── server.ts          # Stripe client (existing)
│   └── security/              # (existing)
│
├── app/api/stripe/
│   ├── booking/
│   │   └── checkout/route.ts  # NEW: Create checkout
│   ├── webhook/
│   │   └── booking/route.ts   # NEW: Handle webhook
│   └── ...                    # (existing gift card routes)
│
├── components/
│   ├── booking/
│   │   └── BookingForm.tsx    # NEW: React form
│   ├── SmoobuWidget.tsx       # (existing, keep for availability)
│   └── ...
│
└── docs/
    ├── STRIPE_BOOKING_INTEGRATION.md  # Full documentation
    └── STRIPE_QUICK_START.md          # This file
```

---

## ⚠️ Important Notes

1. **Never commit secrets** → .env.local is git-ignored ✓
2. **Use test keys first** → Before switching to live keys
3. **Test webhook locally** → Use Stripe CLI
4. **Monitor webhook logs** → Check Stripe Dashboard
5. **Validate dates** → Against Smoobu availability (TODO)
6. **Handle failures** → Implement retry logic for webhooks

---

## 📞 Troubleshooting

### Webhook not receiving?
1. Check Stripe CLI is running
2. Verify endpoint URL in command
3. Check firewall/network settings
4. Look at Stripe Dashboard → Events tab

### Payment session creation fails?
1. Verify Stripe keys in env
2. Check network in browser DevTools
3. Review API response in console
4. Check NextJS server logs

### Prices not calculating?
1. Verify date format (YYYY-MM-DD)
2. Check pricing.ts logic
3. Test calculateBookingPrice() directly
4. Review pricing formula

---

## 🎯 Next Phase Tasks

- [ ] Integrate Smoobu availability API
- [ ] Add calendar component (dates from Smoobu)
- [ ] Create database schema & save bookings
- [ ] Add email templates (confirmation to guest + Manon)
- [ ] Add admin dashboard to view bookings
- [ ] Add refund/cancellation logic
- [ ] Test with live Stripe keys
- [ ] Add analytics/tracking
- [ ] Optimize form UX/styling

---

## 🆘 Need Help?

**Stripe Docs:** https://stripe.com/docs
**API Reference:** https://stripe.com/docs/api
**Status Page:** https://status.stripe.com
**Support:** stripe.com/support
