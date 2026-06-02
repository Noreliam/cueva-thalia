import { HomePageContent } from '@/components/home/HomePageContent';
import { lodgingBusinessJsonLd } from '@/lib/structured-data';
import { buildPageMetadata } from '@/lib/seo';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });
  return buildPageMetadata({
    locale,
    path: '/',
    title: t('meta_title'),
    description: t('meta_description'),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingBusinessJsonLd) }}
      />
      <HomePageContent locale={locale} />
    </>
  );
}
