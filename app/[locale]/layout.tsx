import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import '@/app/globals.css';
import '@/app/site.css';
import SiteHeader from '@/components/layout/SiteHeader';
import SiteFooter from '@/components/layout/SiteFooter';
import SiteWhatsApp from '@/components/layout/SiteWhatsApp';
import CookieBanner from '@/components/layout/CookieBanner';
import { SiteClientEffects } from '@/components/site/SiteClientEffects';

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
    icon: '/favicon.svg',
    apple: '/favicon.svg',
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
  const cookieT = await getTranslations({ locale, namespace: 'Home' });

  return (
    <html lang={locale} className={`${cormorant.variable} ${inter.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <SiteClientEffects />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
          <SiteWhatsApp />
          <CookieBanner
            copy={{
              title: cookieT('cookie_title'),
              text: cookieT('cookie_text'),
              accept: cookieT('cookie_accept'),
              reject: cookieT('cookie_reject'),
              customize: cookieT('cookie_customize'),
              save: cookieT('cookie_save'),
              analytics: cookieT('cookie_analytics'),
              privacy: cookieT('cookie_privacy'),
            }}
          />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
