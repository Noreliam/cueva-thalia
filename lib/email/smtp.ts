import nodemailer from 'nodemailer';

export type SmtpConfig = {
  user: string;
  pass: string;
  from: string;
  replyTo: string;
};

export function getSmtpConfig(): SmtpConfig | null {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    return null;
  }

  return {
    user,
    pass,
    from: process.env.EMAIL_FROM || `Cueva Thalía <${user}>`,
    replyTo: process.env.EMAIL_REPLY_TO || user,
  };
}

function wrapHtmlBody(html: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
</head>
<body>${html}</body>
</html>`;
}

export async function sendViaSmtp(options: {
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

  const to = options.to.trim().toLowerCase();

  await transporter.sendMail({
    from: options.from,
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: wrapHtmlBody(options.html),
    encoding: 'utf-8',
    textEncoding: 'quoted-printable',
  });
}

export function shouldSendEmailInProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
