import type Stripe from 'stripe';
import { randomUUID } from 'crypto';

export type GiftVoucherOrder = {
  voucherCode: string;
  stripeSessionId: string;
  paymentIntentId: string | null;
  amountCents: number;
  currency: string;
  buyerName: string;
  buyerEmail: string;
  recipientName: string;
  message: string | null;
  giftType: string;
  locale: string;
  paidAt: string;
};

export function orderFromCheckoutSession(session: Stripe.Checkout.Session): GiftVoucherOrder | null {
  const meta = session.metadata;
  if (!meta?.buyerName || !meta?.recipientName || !meta?.giftType) {
    return null;
  }

  const amountCents = session.amount_total ?? Number(meta.amountCents);
  if (!amountCents || amountCents < 1) {
    return null;
  }

  return {
    voucherCode: meta.voucherCode || randomUUID(),
    stripeSessionId: session.id,
    paymentIntentId:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? null,
    amountCents,
    currency: (session.currency || 'eur').toLowerCase(),
    buyerName: meta.buyerName,
    buyerEmail: session.customer_email || meta.buyerEmail || '',
    recipientName: meta.recipientName,
    message: meta.message?.trim() ? meta.message : null,
    giftType: meta.giftType,
    locale: meta.locale || 'es',
    paidAt: new Date((session.created || Date.now() / 1000) * 1000).toISOString(),
  };
}

/**
 * Post-payment hook: PDF (pdf-lib), e-mail (Resend), Supabase — à brancher.
 */
export async function fulfillGiftVoucherOrder(order: GiftVoucherOrder): Promise<void> {
  console.log('[STRIPE:gift-voucher] payment confirmed', {
    voucherCode: order.voucherCode,
    stripeSessionId: order.stripeSessionId,
    giftType: order.giftType,
    amountCents: order.amountCents,
    locale: order.locale,
    hasMessage: Boolean(order.message),
  });
  // TODO: insert Supabase `bons_cadeaux`, generate PDF, send transactional email
}
