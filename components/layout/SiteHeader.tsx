'use client';

import { useEffect, useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { siteNavItems } from '@/lib/site-nav';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu principal
      </a>

      <header className={`header${scrolled ? ' header--scrolled' : ''}`} id="header">
        <div className="nav-container">
          <Link href="/" className="logo-container" aria-label="Accueil Cueva Thalía">
            <span className="logo-text">Cueva Thalía</span>
          </Link>

          <nav className="desktop-nav" aria-label="Menu principal">
            <ul>
              {siteNavItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={pathname === item.href ? 'nav-active' : undefined}>
                    {item.labelKey === 'offrir' ? `🎁 ${t(item.labelKey)}` : t(item.labelKey)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sejourner" className="nav-cta">
                  {t('reserver')}
                </Link>
              </li>
              <li>
                <LocaleSwitcher
              className="locale-switcher locale-switcher--header"
              onLocaleChange={() => setMenuOpen(false)}
            />
              </li>
            </ul>
          </nav>

          <button
            className="mobile-burger"
            id="burger-btn"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav className={`mobile-menu${menuOpen ? ' active' : ''}`} id="mobile-menu" aria-hidden={!menuOpen}>
        <ul>
          {siteNavItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
                {item.labelKey === 'offrir' ? `🎁 ${t(item.labelKey)}` : t(item.labelKey)}
              </Link>
            </li>
          ))}
          <li style={{ marginTop: 32 }}>
            <Link
              href="/sejourner"
              className="btn btn-primary mobile-link"
              style={{ color: 'white', fontFamily: 'var(--font-body)', fontSize: 16 }}
              onClick={() => setMenuOpen(false)}
            >
              {t('reserver')}
            </Link>
          </li>
          <li style={{ marginTop: 24 }}>
            <LocaleSwitcher
              className="locale-switcher locale-switcher--mobile"
              onLocaleChange={() => setMenuOpen(false)}
            />
          </li>
        </ul>
      </nav>
    </>
  );
}
