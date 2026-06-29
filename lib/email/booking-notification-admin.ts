import type { BookingOrder } from '@/lib/booking/fulfill';
import { getSmtpConfig, sendViaSmtp, shouldSendEmailInProduction } from '@/lib/email/smtp';

function formatBookingDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) {
    return isoDate;
  }
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function buildAdminNotificationHtml(order: BookingOrder): string {
  const checkIn = formatBookingDate(order.checkInDate);
  const checkOut = formatBookingDate(order.checkOutDate);
  const amount = (order.amountCents / 100).toFixed(0);
  const localeLabels: Record<string, string> = { fr: 'Français', es: 'Espagnol', en: 'Anglais' };

  return `
<p>Bonjour Manon,</p>
<p>Une nouvelle réservation vient d'être confirmée sur le site Cueva Thalía.</p>
<hr>
<p><strong>Détails de la réservation</strong></p>
<ul>
  <li><strong>Référence :</strong> ${order.bookingId}</li>
  <li><strong>Voyageur :</strong> ${order.guestName}</li>
  <li><strong>Email :</strong> ${order.guestEmail}</li>
  <li><strong>Téléphone :</strong> ${order.guestPhone || '—'}</li>
  <li><strong>Nombre de voyageurs :</strong> ${order.guestCount}</li>
  <li><strong>Arrivée :</strong> ${checkIn}</li>
  <li><strong>Départ :</strong> ${checkOut}</li>
  <li><strong>Montant payé :</strong> ${amount} €</li>
  <li><strong>Langue du site :</strong> ${localeLabels[order.locale] || order.locale}</li>
  ${order.smoobuReservationId ? `<li><strong>Smoobu :</strong> #${order.smoobuReservationId}</li>` : ''}
</ul>
${order.specialRequests ? `<p><strong>Demandes spéciales :</strong><br>${order.specialRequests}</p>` : ''}
<hr>
<p>Pensez à vérifier Smoobu et à préparer l'accueil.</p>
<p>— Notification automatique Cueva Thalía</p>
`.trim();
}

export async function sendBookingNotificationToManon(order: BookingOrder): Promise<void> {
  const smtp = getSmtpConfig();
  const adminEmail = process.env.EMAIL_MANON || process.env.SMTP_USER;

  if (!smtp || !adminEmail) {
    console.warn('[EMAIL:admin] SMTP or admin email not configured — skipping notification', {
      bookingId: order.bookingId,
    });
    return;
  }

  const subject = `Nouvelle réservation — ${order.guestCount} voyageur${order.guestCount > 1 ? 's' : ''} · ${order.checkInDate}`;
  const html = buildAdminNotificationHtml(order);

  if (!shouldSendEmailInProduction()) {
    console.log('[EMAIL:admin] dev mode — notification not sent', {
      bookingId: order.bookingId,
      to: adminEmail,
      subject,
      html,
    });
    return;
  }

  await sendViaSmtp({
    user: smtp.user,
    pass: smtp.pass,
    from: smtp.from,
    to: adminEmail,
    replyTo: order.guestEmail || smtp.replyTo,
    subject,
    html,
  });

  console.log('[EMAIL:admin] booking notification sent', {
    bookingId: order.bookingId,
    to: adminEmail,
    guestCount: order.guestCount,
  });
}
