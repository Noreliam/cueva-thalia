import type { BookingOrder } from '@/lib/booking/fulfill';
import { CHECKIN_GENERIC_URL, socialLinksHtml } from '@/lib/social-links';
import { getSmtpConfig, sendViaSmtp, shouldSendEmailInProduction } from '@/lib/email/smtp';

type BookingLocale = 'fr' | 'es' | 'en';

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

function buildPreArrivalTemplate(locale: BookingLocale): EmailTemplate {
  const checkInUrl = CHECKIN_GENERIC_URL;
  const social = socialLinksHtml(locale);

  const templates: Record<BookingLocale, EmailTemplate> = {
    es: {
      subject: 'Bienvenido/a a Cueva Thalía – Check-in obligatorio e información importante antes de su llegada',
      html: `
<p>Estimado/a huésped,</p>
<p>Nos complace darle la bienvenida a Cueva Thalía. Para que su llegada sea lo más cómoda posible, le rogamos leer atentamente la siguiente información.</p>
<h3>✅ Check-in obligatorio</h3>
<p>De acuerdo con la normativa vigente en Canarias, todos los huéspedes deberán completar el registro online antes de su llegada.</p>
<p>Puede realizar el check-in a través del siguiente enlace:<br>
<a href="${checkInUrl}">${checkInUrl}</a></p>
<p>Le agradecemos que complete el formulario antes de su llegada para agilizar el proceso de entrada.</p>
<h3>💳 Fianza</h3>
<p>A la llegada deberá abonarse una fianza de 150 €, que será devuelta una vez finalizada la estancia, tras la revisión y limpieza de la propiedad, siempre que no se hayan producido daños o incumplimientos de las normas de la vivienda.</p>
<p>Para reservas de grupos, la fianza podrá ser superior si así se ha comunicado y aceptado en el momento de la reserva.</p>
<p>La fianza puede abonarse mediante:</p>
<ul>
  <li>Bizum: +34 657 07 79 10</li>
  <li>Transferencia bancaria — IBAN: ES89 1583 0001 1290 7076 0351 — Titular: Manon Christophe Massart</li>
  <li>Efectivo durante el check-in</li>
</ul>
<h3>🏡 Normas de la propiedad</h3>
<ul>
  <li>No están permitidas las fiestas o eventos, salvo autorización previa del propietario.</li>
  <li>Respetar el descanso del vecindario (22:00 – 08:00).</li>
  <li>Prohibido fumar en el interior.</li>
  <li>No utilizar vasos u objetos de cristal en o alrededor de la piscina.</li>
  <li>La piscina climatizada es un espacio de relajación — no saltar ni juegos que provoquen salpicaduras.</li>
  <li>Recomendamos volver a colocar la cubierta térmica cada noche.</li>
  <li>Los menores bajo supervisión permanente de un adulto.</li>
  <li>Mascotas bienvenidas bajo control de sus dueños.</li>
  <li>El número de huéspedes debe corresponder al indicado en la reserva.</li>
  <li>No mover el mobiliario ni sacar elementos al exterior sin autorización.</li>
  <li>Las toallas no podrán utilizarse para la playa.</li>
  <li>Dejar la vivienda en un estado razonable al finalizar la estancia.</li>
  <li>Comunicar inmediatamente cualquier daño o avería.</li>
</ul>
<h3>📶 Wi-Fi</h3>
<p>Red: MIWIFI_SAt2 · Contraseña: DN3tUPAN<br>
También encontrará un código QR en la parte posterior del router.</p>
<h3>🔐 Sistema de alarma</h3>
<p>Detectores de movimiento activados por los huéspedes al abandonar la vivienda. No hay cámaras en el interior.</p>
<h3>⚠️ Responsabilidad</h3>
<p>El uso de la piscina, jardín e instalaciones se realiza bajo la exclusiva responsabilidad de los huéspedes.</p>
<h3>ℹ️ Información importante</h3>
<p>El check-in online, el pago de la fianza y el acceso implican la aceptación de las normas de uso.</p>
<p>Si tiene cualquier duda antes de su llegada, estaremos encantados de ayudarle.</p>
<p>Le deseamos una estancia maravillosa en Cueva Thalía.</p>
<p>Equipo de Cueva Thalía 🌿</p>
${social}
`.trim(),
    },
    fr: {
      subject: 'Bienvenue à Cueva Thalía – Check-in obligatoire et informations importantes avant votre arrivée',
      html: `
<p>Chère/Cher hôte,</p>
<p>Nous sommes ravis de vous accueillir à Cueva Thalía. Pour que votre arrivée se déroule dans les meilleures conditions, merci de lire attentivement les informations ci-dessous.</p>
<h3>✅ Check-in obligatoire</h3>
<p>Conformément à la réglementation en vigueur aux Canaries, tous les voyageurs doivent compléter l'enregistrement en ligne avant leur arrivée.</p>
<p>Check-in via le lien suivant :<br>
<a href="${checkInUrl}">${checkInUrl}</a></p>
<p>Merci de compléter le formulaire avant votre arrivée.</p>
<h3>💳 Caution</h3>
<p>À l'arrivée, une caution de 150 € sera demandée. Elle sera restituée après l'état des lieux, sous réserve qu'aucun dommage ou manquement aux règles n'ait été constaté.</p>
<p>Pour les groupes, la caution peut être supérieure si cela a été communiqué et accepté lors de la réservation.</p>
<p>Modes de paiement : Bizum +34 657 07 79 10 · Virement IBAN ES89 1583 0001 1290 7076 0351 (Manon Christophe Massart) · Espèces au check-in.</p>
<h3>🏡 Règlement intérieur</h3>
<ul>
  <li>Pas de fêtes ou événements sans autorisation préalable.</li>
  <li>Respect du voisinage entre 22h00 et 08h00.</li>
  <li>Interdiction de fumer à l'intérieur.</li>
  <li>Pas de verre dans ou autour de la piscine.</li>
  <li>Piscine chauffée = espace de détente (pas de sauts ni jeux).</li>
  <li>Remettre la bâche thermique chaque soir.</li>
  <li>Mineurs sous surveillance permanente d'un adulte.</li>
  <li>Animaux bienvenus sous responsabilité de leurs propriétaires.</li>
  <li>Nombre de voyageurs conforme à la réservation.</li>
  <li>Ne pas déplacer le mobilier sans autorisation.</li>
  <li>Serviettes de la maison réservées à l'intérieur (pas à la plage).</li>
  <li>Laisser le logement dans un état raisonnable en partant.</li>
  <li>Signaler immédiatement tout dommage ou incident.</li>
</ul>
<h3>📶 Wi-Fi</h3>
<p>Réseau : MIWIFI_SAt2 · Mot de passe : DN3tUPAN</p>
<h3>🔐 Alarme</h3>
<p>Détecteurs de mouvement activés par les voyageurs en quittant le logement. Aucune caméra à l'intérieur.</p>
<h3>⚠️ Responsabilité</h3>
<p>L'utilisation de la piscine, du jardin et des installations se fait sous la responsabilité exclusive des voyageurs.</p>
<h3>ℹ️ Information importante</h3>
<p>Le check-in en ligne, le paiement de la caution et l'accès au logement impliquent l'acceptation du présent règlement.</p>
<p>Une question avant votre arrivée ? Nous sommes à votre disposition.</p>
<p>Excellente séjour à Cueva Thalía.</p>
<p>L'équipe Cueva Thalía 🌿</p>
${social}
`.trim(),
    },
    en: {
      subject: 'Welcome to Cueva Thalía – Mandatory check-in and important information before your arrival',
      html: `
<p>Dear guest,</p>
<p>We are delighted to welcome you to Cueva Thalía. Please read the following information carefully before your arrival.</p>
<h3>✅ Mandatory check-in</h3>
<p>Under Canarian regulations, all guests must complete online registration before arrival.</p>
<p>Check-in link:<br>
<a href="${checkInUrl}">${checkInUrl}</a></p>
<p>Please complete the form before arrival to speed up entry.</p>
<h3>💳 Security deposit</h3>
<p>A €150 deposit is required on arrival. It will be refunded after checkout and inspection, provided no damage or rule violations occurred.</p>
<p>For group bookings, the deposit may be higher if agreed at booking time.</p>
<p>Payment: Bizum +34 657 07 79 10 · Bank transfer IBAN ES89 1583 0001 1290 7076 0351 (Manon Christophe Massart) · Cash at check-in.</p>
<h3>🏡 House rules</h3>
<ul>
  <li>No parties or events without prior owner approval.</li>
  <li>Respect neighbours between 22:00 and 08:00.</li>
  <li>No smoking indoors.</li>
  <li>No glassware in or around the pool.</li>
  <li>Heated pool is for relaxation — no jumping or splash games.</li>
  <li>Replace the thermal cover each evening.</li>
  <li>Children must be supervised by an adult at all times.</li>
  <li>Pets welcome under owner control.</li>
  <li>Guest count must match the booking.</li>
  <li>Do not move furniture without permission.</li>
  <li>House towels not for beach use.</li>
  <li>Leave the property in reasonable condition on departure.</li>
  <li>Report any damage or issues immediately.</li>
</ul>
<h3>📶 Wi-Fi</h3>
<p>Network: MIWIFI_SAt2 · Password: DN3tUPAN</p>
<h3>🔐 Alarm system</h3>
<p>Motion detectors activated by guests when leaving. No indoor cameras.</p>
<h3>⚠️ Liability</h3>
<p>Use of the pool, garden and facilities is at the guests' sole responsibility.</p>
<h3>ℹ️ Important information</h3>
<p>Online check-in, deposit payment and property access imply acceptance of these rules.</p>
<p>Questions before arrival? We are happy to help.</p>
<p>We wish you a wonderful stay at Cueva Thalía.</p>
<p>The Cueva Thalía Team 🌿</p>
${social}
`.trim(),
    },
  };

  return templates[locale];
}

export async function sendPreArrivalEmail(order: BookingOrder): Promise<void> {
  const smtp = getSmtpConfig();

  if (!smtp) {
    console.warn('[EMAIL:pre-arrival] SMTP not configured — skipping', { bookingId: order.bookingId });
    return;
  }

  if (!order.guestEmail) {
    console.warn('[EMAIL:pre-arrival] guest email missing — skipping', { bookingId: order.bookingId });
    return;
  }

  const locale = normalizeLocale(order.locale);
  const { subject, html } = buildPreArrivalTemplate(locale);

  if (!shouldSendEmailInProduction()) {
    console.log('[EMAIL:pre-arrival] dev mode — email not sent', {
      bookingId: order.bookingId,
      to: order.guestEmail,
      locale,
      subject,
    });
    return;
  }

  await sendViaSmtp({
    user: smtp.user,
    pass: smtp.pass,
    from: smtp.from,
    to: order.guestEmail,
    replyTo: smtp.replyTo,
    subject,
    html,
  });

  console.log('[EMAIL:pre-arrival] email sent', {
    bookingId: order.bookingId,
    to: order.guestEmail,
    locale,
    checkInDate: order.checkInDate,
  });
}

export function isWithinPreArrivalWindow(checkInDate: string, now = new Date()): boolean {
  const [year, month, day] = checkInDate.split('-').map(Number);
  if (!year || !month || !day) {
    return false;
  }

  const checkIn = new Date(year, month - 1, day, 16, 0, 0, 0);
  const hoursUntilCheckIn = (checkIn.getTime() - now.getTime()) / (1000 * 60 * 60);

  return hoursUntilCheckIn <= 50 && hoursUntilCheckIn >= 46;
}
