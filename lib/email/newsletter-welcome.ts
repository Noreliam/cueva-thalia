import { WELCOME_DISCOUNT_CODE } from '@/lib/newsletter/constants';
import { socialLinksHtml } from '@/lib/social-links';
import { getSmtpConfig, sendViaSmtp, shouldSendEmailInProduction } from '@/lib/email/smtp';

type Locale = 'fr' | 'es' | 'en';

function normalizeLocale(locale: string): Locale {
  if (locale === 'fr' || locale === 'en' || locale === 'es') {
    return locale;
  }
  return 'es';
}

function buildWelcomeEmail(locale: Locale): { subject: string; html: string } {
  const social = socialLinksHtml(locale);

  const templates: Record<Locale, { subject: string; html: string }> = {
    fr: {
      subject: 'Votre code de bienvenue — Cueva Thalía 🌿',
      html: `
<p>Bienvenue dans le Cercle Privé de Cueva Thalía !</p>
<p>Votre code de réduction : <strong>${WELCOME_DISCOUNT_CODE}</strong></p>
<p>Profitez de 10 % de réduction sur votre première réservation directe sur notre site. Valable 30 jours.</p>
<p><a href="https://cueva-thalia.com/fr/sejourner">Réserver maintenant →</a></p>
${social}
<p>À très bientôt,<br>L'équipe Cueva Thalía</p>
`.trim(),
    },
    es: {
      subject: 'Su código de bienvenida — Cueva Thalía 🌿',
      html: `
<p>¡Bienvenido/a al Círculo Privado de Cueva Thalía!</p>
<p>Su código de descuento: <strong>${WELCOME_DISCOUNT_CODE}</strong></p>
<p>Disfrute de un 10 % de descuento en su primera reserva directa en nuestro sitio. Válido 30 días.</p>
<p><a href="https://cueva-thalia.com/sejourner">Reservar ahora →</a></p>
${social}
<p>Hasta pronto,<br>Equipo Cueva Thalía</p>
`.trim(),
    },
    en: {
      subject: 'Your welcome code — Cueva Thalía 🌿',
      html: `
<p>Welcome to the Cueva Thalía Private Circle!</p>
<p>Your discount code: <strong>${WELCOME_DISCOUNT_CODE}</strong></p>
<p>Enjoy 10% off your first direct booking on our website. Valid for 30 days.</p>
<p><a href="https://cueva-thalia.com/en/sejourner">Book now →</a></p>
${social}
<p>See you soon,<br>The Cueva Thalía Team</p>
`.trim(),
    },
  };

  return templates[locale];
}

export async function sendNewsletterWelcomeEmail(email: string, locale: string): Promise<void> {
  const smtp = getSmtpConfig();
  if (!smtp) {
    console.warn('[EMAIL:newsletter] SMTP not configured — skipping welcome email', { email });
    return;
  }

  const loc = normalizeLocale(locale);
  const { subject, html } = buildWelcomeEmail(loc);

  if (!shouldSendEmailInProduction()) {
    console.log('[EMAIL:newsletter] dev mode — welcome email not sent', { email, locale: loc, subject });
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

  console.log('[EMAIL:newsletter] welcome email sent', { email, locale: loc });
}
