import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import '@/app/globals.css';
import '@/app/site.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteWhatsApp from '@/components/layout/SiteWhatsApp';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Cueva Thalía — Maison privée avec piscine chauffée à Tenerife',
  description:
    'Séjournez dans une cueva privée à Tenerife avec piscine intérieure chauffée, jardin privé et atmosphère immersive.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23B85C38'/></svg>",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <SiteWhatsApp />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
