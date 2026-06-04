# Stripe Booking — Implementation Checklist

## Phase 1: Stripe Setup (15 min)

### Stripe Account
- [ ] Create/access Stripe account at https://stripe.com
- [ ] Go to Dashboard → API Keys
- [ ] Copy Publishable Key (pk_xxx)
- [ ] Copy Secret Key (sk_xxx) — **DO NOT COMMIT THIS**

### Environment Variables
- [ ] Open `.env.local`
- [ ] Add `STRIPE_SECRET_KEY=sk_xxx`
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx`
- [ ] Verify `.env.local` is in `.gitignore` ✓
- [ ] **DO NOT commit `.env.local`** ⚠️

### Webhook Setup (Local Development)
- [ ] Install Stripe CLI: `brew install stripe/stripe-cli/stripe`
- [ ] Run: `stripe login`
- [ ] Run: `stripe listen --forward-to http://localhost:3000/api/stripe/webhook/booking`
- [ ] Copy webhook secret displayed (whsec_xxx)
- [ ] Add to `.env.local`: `STRIPE_WEBHOOK_SECRET=whsec_xxx`

## Phase 2: Code Review (10 min)

### Files Created
- [ ] Read `/lib/booking/schema.ts` (Zod validation)
- [ ] Read `/lib/booking/pricing.ts` (Price calculation logic)
- [ ] Read `/app/api/stripe/booking/checkout/route.ts` (API endpoint)
- [ ] Read `/app/api/stripe/webhook/booking/route.ts` (Webhook handler)
- [ ] Read `/components/booking/BookingForm.tsx` (React form)

### Integration Points
- [ ] Review how booking form validates input
- [ ] Review how checkout creates Stripe session
- [ ] Review how webhook receives confirmation
- [ ] Check security measures (Turnstile, rate limiting)

## Phase 3: Frontend Integration (30 min)

### Replace Smoobu Widget
- [ ] Option A: Keep Smoobu (read-only calendar)
- [ ] Option B: Replace with custom BookingForm
- [ ] Decide which approach fits your UX

**If replacing Smoobu:**
- [ ] Edit `/app/[locale]/(public)/sejourner/page.tsx`
- [ ] Replace `<SmoobuBookingGate>` with `<BookingForm>`
- [ ] Add success/cancelled pages (optional)
- [ ] Style form to match site design

**If keeping Smoobu:**
- [ ] Add BookingForm alongside widget
- [ ] Show form as primary booking method
- [ ] Keep widget as backup

### Form Styling
- [ ] Review form styles in CSS
- [ ] Match Cueva Thalía design system
- [ ] Test responsive layout (mobile/tablet/desktop)
- [ ] Test accessibility (keyboard nav, screen readers)

## Phase 4: Testing (45 min)

### Local Testing Setup
- [ ] Start dev server: `npm run dev`
- [ ] Run Stripe CLI webhook listener (Terminal 2)
- [ ] Open browser to http://localhost:3000

### Test Scenarios

**Successful Payment:**
- [ ] Fill booking form completely
- [ ] Use test card: `4242 4242 4242 4242`
- [ ] Exp: 12/34 | CVC: 567
- [ ] Complete payment
- [ ] Verify webhook received (check CLI output)
- [ ] Check redirect to success page

**Declined Card:**
- [ ] Use test card: `4000 0000 0000 0002`
- [ ] Payment should fail
- [ ] Should show error message
- [ ] Should allow retry

**Group Discount:**
- [ ] Select 6+ guests
- [ ] Verify 10% discount applied
- [ ] Check price calculation is correct

**Date Validation:**
- [ ] Try dates < 2 nights (should fail)
- [ ] Try checkout before checkin (should fail)
- [ ] Try past dates (should fail)
- [ ] Try valid dates (should work)

**Form Validation:**
- [ ] Try submit without name (should fail)
- [ ] Try invalid email (should fail)
- [ ] Try non-accepted terms (button disabled)
- [ ] Try without CAPTCHA verification (should fail)

### Webhook Testing
In Terminal 2 (running Stripe CLI):
```bash
# Trigger test event
stripe trigger checkout.session.completed
```
- [ ] Check NextJS console for webhook handler logs
- [ ] Check Stripe Dashboard → Events → Webhook endpoint
- [ ] Verify event status shows "Successful delivery"

## Phase 5: Database (Optional but Recommended)

### Supabase Schema
- [ ] Create Supabase table (see STRIPE_BOOKING_INTEGRATION.md)
- [ ] Add table columns for booking data
- [ ] Create indexes for performance

### Update Webhook
- [ ] Modify webhook handler to save bookings to DB
- [ ] Store: bookingId, guest info, payment details
- [ ] Store: created_at, status, metadata

### Admin Dashboard (Future)
- [ ] Create admin page to view bookings
- [ ] Add filtering by date/status
- [ ] Add export to CSV

## Phase 6: Email Notifications (Optional)

### Email Service Setup
Choose one:
- [ ] SendGrid
- [ ] Resend
- [ ] Mailgun
- [ ] AWS SES

### Templates
- [ ] Confirmation email to guest
- [ ] Notification email to Manon
- [ ] Cancellation email template (future)
- [ ] Reminder emails (future)

### Integration
- [ ] Add email service to webhook handler
- [ ] Test email delivery
- [ ] Verify formatting/styling

## Phase 7: Production Deployment

### Before Going Live
- [ ] Test all scenarios with test keys ✓
- [ ] Get Stripe live keys (separate from test keys)
- [ ] Review security checklist (STRIPE_BOOKING_INTEGRATION.md)
- [ ] Enable HTTPS (already done on Netlify)
- [ ] Test webhook with Stripe CLI one more time

### Netlify Configuration
- [ ] Go to Netlify Site Settings → Build & deploy
- [ ] Add environment variables:
  - [ ] `STRIPE_SECRET_KEY` (live key)
  - [ ] `STRIPE_WEBHOOK_SECRET` (live webhook secret)
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (live key)

### Stripe Webhook (Live)
- [ ] Go to Stripe Dashboard → Webhook endpoints
- [ ] Add new endpoint: `https://cueva-thalia.com/api/stripe/webhook/booking`
- [ ] Select event: `checkout.session.completed`
- [ ] Copy signing secret
- [ ] Add to Netlify env vars

### Final Testing (Live Keys)
- [ ] Deploy to production
- [ ] Test full booking flow with real card (test amount)
- [ ] Verify webhook delivery
- [ ] Monitor Stripe Dashboard for activity
- [ ] Check server logs for errors

### Monitoring
- [ ] Set up Stripe alerts (dashboard)
- [ ] Monitor webhook delivery failures
- [ ] Check daily payment activity
- [ ] Create simple admin page to view bookings

## Phase 8: Future Enhancements

### High Priority
- [ ] Smoobu availability API integration
- [ ] Custom calendar component
- [ ] Refund/cancellation logic
- [ ] Email confirmations

### Medium Priority
- [ ] Admin booking management panel
- [ ] Payment retry logic
- [ ] Deposit vs full payment option
- [ ] Group booking workflow

### Low Priority
- [ ] Analytics/reporting
- [ ] Automated SMS notifications
- [ ] Multi-language email templates
- [ ] Recurring bookings

---

## 📊 Success Metrics

After implementation:
- [ ] 0 booking errors in production
- [ ] < 5 second checkout time
- [ ] 100% webhook delivery rate
- [ ] All customers receive confirmation email
- [ ] All transactions properly recorded
- [ ] No Stripe disputes/chargebacks

---

## 🆘 Troubleshooting Checklist

### Webhook Not Receiving?
- [ ] Is Stripe CLI running?
- [ ] Is endpoint URL correct?
- [ ] Are you forwarding to right port (3000)?
- [ ] Check firewall/VPN blocking?

### Form Not Submitting?
- [ ] Are API keys in `.env.local`?
- [ ] Is Turnstile key set?
- [ ] Check browser console for errors
- [ ] Verify API endpoint exists

### Payment Fails?
- [ ] Is Secret Key valid?
- [ ] Are you using right API version?
- [ ] Check Stripe Dashboard for errors
- [ ] Try different test card

### Price Calculation Wrong?
- [ ] Check calculateNights() logic
- [ ] Verify date parsing (ISO format)
- [ ] Test with console.log()
- [ ] Check weekend/weekday logic

---

## 📞 Support Resources

- **Stripe Docs:** https://stripe.com/docs
- **API Reference:** https://stripe.com/docs/api
- **Test Cards:** https://stripe.com/docs/testing
- **Webhook Events:** https://stripe.com/docs/api/events
- **Status:** https://status.stripe.com

---

## ✅ Sign-Off

When complete, you should be able to:
- [ ] Accept bookings on website
- [ ] Process payments via Stripe
- [ ] Receive webhook confirmations
- [ ] View all transactions in Stripe Dashboard
- [ ] (Optional) View bookings in database
- [ ] (Optional) Send confirmation emails
