import nodemailer from 'nodemailer';
import type { BookingOrder } from '@/lib/booking/fulfill';

type BookingLocale = 'fr' | 'en' | 'es';

type EmailTemplate = {
  subject: string;
  html: string;
};

function normalizeLocale(locale: string): BookingLocale {
  if (locale === 'fr' || locale === 'en' || locale === 'es') {
    return locale;
  }
  return 'es';
}

function formatBookingDate(isoDate: string, locale: BookingLocale): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) {
    return isoDate;
  }
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function formatAmount(amountCents: number): string {
  return (amountCents / 100).toFixed(0);
}

function buildTemplate(order: BookingOrder, locale: BookingLocale): EmailTemplate {
  const checkIn = formatBookingDate(order.checkInDate, locale);
  const checkOut = formatBookingDate(order.checkOutDate, locale);
  const amount = formatAmount(order.amountCents);
  const guestName = order.guestName || 'Guest';
  const checkInUrl = order.onlineCheckInUrl?.trim();

  const onlineCheckInFr = checkInUrl
    ? `<p><strong>Check-in en ligne (obligatoire)</strong></p>
<p>Merci de compléter le formulaire d'enregistrement avant votre arrivée :<br>
<a href="${checkInUrl}">${checkInUrl}</a></p>`
    : `<p><strong>Check-in en ligne (obligatoire)</strong></p>
<p>Vous recevrez un lien personnel pour compléter votre enregistrement — pensez à le remplir avant votre arrivée.</p>`;

  const onlineCheckInEn = checkInUrl
    ? `<p><strong>Online check-in (required)</strong></p>
<p>Please complete the registration form before arrival:<br>
<a href="${checkInUrl}">${checkInUrl}</a></p>`
    : `<p><strong>Online check-in (required)</strong></p>
<p>You will receive a personal link to complete your registration — please fill it in before arrival.</p>`;

  const onlineCheckInEs = checkInUrl
    ? `<p><strong>Check-in en línea (obligatorio)</strong></p>
<p>Complete el formulario de registro antes de su llegada:<br>
<a href="${checkInUrl}">${checkInUrl}</a></p>`
    : `<p><strong>Check-in en línea (obligatorio)</strong></p>
<p>Recibirá un enlace personal para completar su registro — complételo antes de su llegada.</p>`;

  const templates: Record<BookingLocale, EmailTemplate> = {
    fr: {
      subject: 'Votre réservation est confirmée — Cueva Thalía ✨',
      html: `
<p>Bonjour ${guestName},</p>
<p>Votre réservation à Cueva Thalía est confirmée.<br>
Nous avons hâte de vous accueillir dans ce lieu un peu hors du monde.</p>
<hr>
<p><strong>Votre séjour</strong></p>
<p>
Arrivée&nbsp;&nbsp;&nbsp;: ${checkIn}<br>
Départ&nbsp;&nbsp;&nbsp;&nbsp;: ${checkOut}<br>
Voyageurs : ${order.guestCount}<br>
Référence : ${order.bookingId}<br>
Montant&nbsp;&nbsp;&nbsp;: ${amount} €
</p>
<hr>
${onlineCheckInFr}
<hr>
<p><strong>Ce qui vous attend</strong></p>
<p>
Une grotte volcanique creusée à même la roche, nichée sous un jardin de Tenerife.<br>
Une piscine intérieure chauffée entre 34 et 40 °C, entièrement privée.<br>
Le silence. La lumière douce. L'impression d'être ailleurs, enfin.
</p>
<hr>
<p><strong>Informations pratiques</strong></p>
<p>
Adresse&nbsp;&nbsp;: San Miguel de Abona, Tenerife<br>
Check-in&nbsp;&nbsp;: à partir de 16h00<br>
Check-out : avant 13h00<br>
Parking&nbsp;&nbsp;&nbsp;: disponible sur place
</p>
<p>
Les codes d'accès et consignes d'arrivée vous seront envoyés séparément, environ 48&nbsp;h avant votre arrivée (email ou WhatsApp).
</p>
<p>
Une question, une demande particulière ?<br>
Manon est disponible par WhatsApp : +34 657 077 910<br>
Ou répondez directement à cet email.
</p>
<hr>
<p>À très bientôt à Cueva Thalía.</p>
<p>Manon</p>
`.trim(),
    },
    en: {
      subject: 'Your booking is confirmed — Cueva Thalía ✨',
      html: `
<p>Hello ${guestName},</p>
<p>Your stay at Cueva Thalía is confirmed.<br>
We can't wait to welcome you to this quiet, extraordinary place.</p>
<hr>
<p><strong>Your stay</strong></p>
<p>
Check-in&nbsp;&nbsp;: ${checkIn}<br>
Check-out : ${checkOut}<br>
Guests&nbsp;&nbsp;&nbsp;&nbsp;: ${order.guestCount}<br>
Reference : ${order.bookingId}<br>
Paid&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: €${amount}
</p>
<hr>
${onlineCheckInEn}
<hr>
<p><strong>What awaits you</strong></p>
<p>
A volcanic cave carved into the rock, hidden beneath a garden in Tenerife.<br>
A private indoor heated pool — 34 to 40 °C — yours alone.<br>
Silence. Warm light. The rare feeling of being somewhere truly different.
</p>
<hr>
<p><strong>Practical information</strong></p>
<p>
Address&nbsp;&nbsp;&nbsp;: San Miguel de Abona, Tenerife<br>
Check-in&nbsp;&nbsp;: from 4:00 PM<br>
Check-out : before 1:00 PM<br>
Parking&nbsp;&nbsp;&nbsp;: available on site
</p>
<p>
Access codes and arrival instructions will be sent separately, about 48&nbsp;hours before check-in (email or WhatsApp).
</p>
<p>
Any questions or special requests?<br>
Manon is available on WhatsApp: +34 657 077 910<br>
Or simply reply to this email.
</p>
<hr>
<p>Looking forward to welcoming you.</p>
<p>Manon</p>
`.trim(),
    },
    es: {
      subject: 'Tu reserva está confirmada — Cueva Thalía ✨',
      html: `
<p>Hola ${guestName},</p>
<p>Tu reserva en Cueva Thalía está confirmada.<br>
Estamos deseando recibirte en este lugar fuera del tiempo.</p>
<hr>
<p><strong>Tu estancia</strong></p>
<p>
Llegada&nbsp;&nbsp;&nbsp;&nbsp;: ${checkIn}<br>
Salida&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${checkOut}<br>
Huéspedes&nbsp;&nbsp;: ${order.guestCount}<br>
Referencia : ${order.bookingId}<br>
Pagado&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: ${amount} €
</p>
<hr>
${onlineCheckInEs}
<hr>
<p><strong>Lo que te espera</strong></p>
<p>
Una cueva volcánica excavada en la roca viva, escondida bajo un jardín de Tenerife.<br>
Una piscina interior climatizada entre 34 y 40 °C, completamente privada.<br>
Silencio. Luz cálida. La sensación de haber encontrado un lugar único.
</p>
<hr>
<p><strong>Información práctica</strong></p>
<p>
Dirección&nbsp;&nbsp;&nbsp;: San Miguel de Abona, Tenerife<br>
Check-in&nbsp;&nbsp;&nbsp;&nbsp;: a partir de las 16:00 h<br>
Check-out&nbsp;&nbsp;&nbsp;: antes de las 13:00 h<br>
Aparcamiento : disponible en el lugar
</p>
<p>
Los códigos de acceso y las instrucciones de llegada se enviarán por separado, unos 48&nbsp;h antes de su llegada (email o WhatsApp).
</p>
<p>
¿Alguna pregunta o solicitud especial?<br>
Manon está disponible por WhatsApp: +34 657 077 910<br>
O simplemente responde a este correo.
</p>
<hr>
<p>Hasta pronto en Cueva Thalía.</p>
<p>Manon</p>
`.trim(),
    },
  };

  return templates[locale];
}

async function sendViaSmtp(options: {
  user: string;
  pass: string;
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  html: string;
}): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: options.user,
      pass: options.pass,
    },
  });

  await transporter.sendMail({
    from: options.from,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  });
}

export async function sendBookingConfirmation(order: BookingOrder): Promise<void> {
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  if (!smtpUser || !smtpPass) {
    console.warn('[EMAIL:booking] SMTP_USER / SMTP_PASS not set — skipping confirmation email', {
      bookingId: order.bookingId,
    });
    return;
  }

  const from = process.env.EMAIL_FROM || `Cueva Thalía <${smtpUser}>`;

  if (!order.guestEmail) {
    console.warn('[EMAIL:booking] guest email missing — skipping confirmation email', {
      bookingId: order.bookingId,
    });
    return;
  }

  const locale = normalizeLocale(order.locale);
  const { subject, html } = buildTemplate(order, locale);
  const replyTo = process.env.EMAIL_REPLY_TO || smtpUser;

  if (process.env.NODE_ENV !== 'production') {
    console.log('[EMAIL:booking] dev mode — email not sent', {
      bookingId: order.bookingId,
      to: order.guestEmail,
      from,
      replyTo,
      locale,
      subject,
      html,
    });
    return;
  }

  await sendViaSmtp({
    user: smtpUser,
    pass: smtpPass,
    from,
    to: order.guestEmail,
    replyTo,
    subject,
    html,
  });

  console.log('[EMAIL:booking] confirmation email sent', {
    bookingId: order.bookingId,
    to: order.guestEmail,
    locale,
  });
}
