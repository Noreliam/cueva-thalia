import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';

export async function BackHomeLink({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Common' });
  return (
    <Link href="/" className="btn btn-secondary">
      {t('back_home')}
    </Link>
  );
}
