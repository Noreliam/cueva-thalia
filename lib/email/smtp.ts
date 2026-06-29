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

  await transporter.sendMail({
    from: options.from,
    to: options.to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
  });
}

export function shouldSendEmailInProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
