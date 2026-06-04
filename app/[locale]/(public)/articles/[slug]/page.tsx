import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const title = slug.replace(/-/g, ' ');
  return {
    title: `${title} | Cueva Thalía`,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'Articles' });

  return (
    <div className="bg-ct-blanc-casse min-h-screen text-ct-brun-chaud pt-24 pb-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <header className="space-y-4">
          <p className="text-sm uppercase tracking-widest text-ct-terracotta">{t('journal')}</p>
          <h1 className="capitalize">{slug.replace(/-/g, ' ')}</h1>
        </header>

        <div className="prose prose-lg prose-p:font-sans prose-p:leading-loose prose-ct-brun-chaud mx-auto">
          <p>{t('placeholder_slug', { slug })}</p>
          <p>{t('placeholder_todo')}</p>
          <h2>{t('intro_heading')}</h2>
          <p>{t('intro_body')}</p>
        </div>
      </article>
    </div>
  );
}

export function generateStaticParams() {
  return [];
}
