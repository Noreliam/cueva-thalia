'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { routing } from '@/i18n/routing';

const localeLabels: Record<(typeof routing.locales)[number], string> = {
  es: 'ES',
  fr: 'FR',
  en: 'EN',
};

type LocaleSwitcherProps = {
  className?: string;
};

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav className={className ?? 'locale-switcher'} aria-label="Choisir la langue">
      <ul className="locale-switcher__list">
        {routing.locales.map((loc) => (
          <li key={loc}>
            <Link
              href={pathname}
              locale={loc}
              className={locale === loc ? 'locale-switcher__link is-active' : 'locale-switcher__link'}
              aria-current={locale === loc ? 'true' : undefined}
            >
              {localeLabels[loc]}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
