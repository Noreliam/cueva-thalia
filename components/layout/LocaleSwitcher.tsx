'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const localeLabels: Record<(typeof routing.locales)[number], string> = {
  es: 'ES',
  fr: 'FR',
  en: 'EN',
};

type LocaleSwitcherProps = {
  className?: string;
  onLocaleChange?: () => void;
};

export default function LocaleSwitcher({ className, onLocaleChange }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale: (typeof routing.locales)[number]) => {
    if (nextLocale === locale) return;
    router.replace(pathname, { locale: nextLocale });
    onLocaleChange?.();
  };

  return (
    <nav className={className ?? 'locale-switcher'} aria-label="Choisir la langue">
      <ul className="locale-switcher__list">
        {routing.locales.map((loc) => (
          <li key={loc}>
            <button
              type="button"
              className={
                locale === loc ? 'locale-switcher__link is-active' : 'locale-switcher__link'
              }
              aria-current={locale === loc ? 'true' : undefined}
              lang={loc}
              onClick={() => switchLocale(loc)}
            >
              {localeLabels[loc]}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
