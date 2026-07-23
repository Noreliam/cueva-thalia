import { INFLUENCEUR_COMMISSION_PERCENT, INFLUENCEUR_DISCOUNT_PERCENT } from '@/lib/influenceurs/constants';
import { getSmtpConfig, sendViaSmtp, shouldSendEmailInProduction } from '@/lib/email/smtp';
import { socialLinksHtml } from '@/lib/social-links';

type Locale = 'fr' | 'es' | 'en';

function normalizeLocale(locale: string): Locale {
  if (locale === 'fr' || locale === 'en' || locale === 'es') {
    return locale;
  }
  return 'es';
}

function buildInfluenceurWelcomeEmail(
  locale: Locale,
  code: string,
  trackingUrl: string,
): { subject: string; html: string } {
  const social = socialLinksHtml(locale);

  const templates: Record<Locale, { subject: string; html: string }> = {
    fr: {
      subject: 'Votre lien de parrainage Cueva Thalía 🌿',
      html: `
<p>Bonjour,</p>
<p>Bienvenue dans le programme influenceur Cueva Thalía — merci de faire découvrir ce lieu un peu hors du monde à votre audience.</p>
<hr>
<p><strong>Votre lien personnel de suivi</strong></p>
<p style="font-size:18px;"><strong><a href="${trackingUrl}">${trackingUrl}</a></strong></p>
<p>Votre code : <strong>${code}</strong></p>
<p><a href="${trackingUrl}">Voir la page de réservation →</a></p>
<hr>
<h3>Comment ça marche ?</h3>
<ul>
  <li>Partagez ce lien avec votre audience.</li>
  <li>Les visiteurs qui réservent via votre lien bénéficient automatiquement de <strong>${INFLUENCEUR_DISCOUNT_PERCENT} % de réduction</strong>.</li>
  <li>Vous touchez une commission de <strong>${INFLUENCEUR_COMMISSION_PERCENT} %</strong> sur chaque réservation confirmée.</li>
</ul>
<hr>
<p>Les commissions sont suivies automatiquement — aucune action supplémentaire de votre part.</p>
<p>Des questions ? Répondez à cet email ou contactez-nous à contact@cueva-thalia.com.</p>
${social}
<p>À très bientôt,<br>L'équipe Cueva Thalía</p>
`.trim(),
    },
    es: {
      subject: 'Su enlace de referidos Cueva Thalía 🌿',
      html: `
<p>Hola,</p>
<p>¡Bienvenido/a al programa de influencers de Cueva Thalía! Gracias por ayudarnos a dar a conocer este lugar fuera del tiempo.</p>
<hr>
<p><strong>Su enlace personal de seguimiento</strong></p>
<p style="font-size:18px;"><strong><a href="${trackingUrl}">${trackingUrl}</a></strong></p>
<p>Su código: <strong>${code}</strong></p>
<p><a href="${trackingUrl}">Ver la página de reserva →</a></p>
<hr>
<h3>¿Cómo funciona?</h3>
<ul>
  <li>Comparta este enlace con su audiencia.</li>
  <li>Los visitantes que reserven a través de su enlace obtienen automáticamente un <strong>${INFLUENCEUR_DISCOUNT_PERCENT} % de descuento</strong>.</li>
  <li>Usted recibe una comisión del <strong>${INFLUENCEUR_COMMISSION_PERCENT} %</strong> por cada reserva confirmada.</li>
</ul>
<hr>
<p>Las comisiones se registran automáticamente — no necesita hacer nada más.</p>
<p>¿Alguna pregunta? Responda a este email o escríbanos a contact@cueva-thalia.com.</p>
${social}
<p>Hasta pronto,<br>Equipo Cueva Thalía</p>
`.trim(),
    },
    en: {
      subject: 'Your Cueva Thalía referral link 🌿',
      html: `
<p>Hello,</p>
<p>Welcome to the Cueva Thalía influencer programme — thank you for sharing this extraordinary place with your audience.</p>
<hr>
<p><strong>Your personal tracking link</strong></p>
<p style="font-size:18px;"><strong><a href="${trackingUrl}">${trackingUrl}</a></strong></p>
<p>Your code: <strong>${code}</strong></p>
<p><a href="${trackingUrl}">View the booking page →</a></p>
<hr>
<h3>How it works</h3>
<ul>
  <li>Share this link with your audience.</li>
  <li>Visitors who book through your link automatically receive <strong>${INFLUENCEUR_DISCOUNT_PERCENT}% off</strong>.</li>
  <li>You earn a <strong>${INFLUENCEUR_COMMISSION_PERCENT}% commission</strong> on each confirmed booking.</li>
</ul>
<hr>
<p>Commissions are tracked automatically — no further action required on your part.</p>
<p>Questions? Reply to this email or contact us at contact@cueva-thalia.com.</p>
${social}
<p>See you soon,<br>The Cueva Thalía Team</p>
`.trim(),
    },
  };

  return templates[locale];
}

export async function sendInfluenceurWelcomeEmail(
  email: string,
  code: string,
  trackingUrl: string,
  locale: string,
): Promise<void> {
  const smtp = getSmtpConfig();
  if (!smtp) {
    console.warn('[EMAIL:influenceur] SMTP not configured — skipping welcome email', { email, code });
    return;
  }

  const loc = normalizeLocale(locale);
  const { subject, html } = buildInfluenceurWelcomeEmail(loc, code, trackingUrl);

  if (!shouldSendEmailInProduction()) {
    console.log('[EMAIL:influenceur] dev mode — welcome email not sent', {
      email,
      code,
      locale: loc,
      subject,
      trackingUrl,
    });
    return;
  }

  await sendViaSmtp({
    user: smtp.user,
    pass: smtp.pass,
    from: smtp.from,
    to: email,
    replyTo: smtp.replyTo,
    subject,
    html,
  });

  console.log('[EMAIL:influenceur] welcome email sent', { email, code, locale: loc });
}
