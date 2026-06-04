'use client';

import { useEffect, useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { siteNavItems, type NavItem } from '@/lib/site-nav';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';

function isNavActive(pathname: string, href: NavItem['href']) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('Navigation');

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    document.body.classList.toggle('menu-open', menuOpen);
    return () => {
      document.body.style.overflow = '';
      document.body.classList.remove('menu-open');
    };
  }, [menuOpen]);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    if (menuOpen) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const headerClass = [
    'header',
    scrolled ? 'header--scrolled' : '',
    menuOpen ? 'header--menu-open' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu principal
      </a>

      <header className={headerClass} id="header">
        <div className="nav-container">
          <Link href="/" className="logo-container" aria-label="Accueil Cueva Thalía">
            <span className="logo-text">Cueva Thalía</span>
          </Link>

          <nav className="desktop-nav" aria-label="Menu principal">
            <ul>
              {siteNavItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={isNavActive(pathname, item.href) ? 'nav-active' : undefined}
                  >
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

      <nav
        className={`mobile-menu${menuOpen ? ' active' : ''}`}
        id="mobile-menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen ? true : undefined}
      >
        <ul>
          {siteNavItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`mobile-link${isNavActive(pathname, item.href) ? ' nav-active' : ''}`}
                onClick={closeMenu}
                aria-current={isNavActive(pathname, item.href) ? 'page' : undefined}
              >
                {item.labelKey === 'offrir' ? `🎁 ${t(item.labelKey)}` : t(item.labelKey)}
              </Link>
            </li>
          ))}
          <li className="mobile-menu-cta">
            <Link href="/sejourner" className="btn btn-primary mobile-menu-reserve" onClick={closeMenu}>
              {t('reserver')}
            </Link>
          </li>
          <li className="mobile-menu-locale">
            <LocaleSwitcher
              className="locale-switcher locale-switcher--mobile"
              onLocaleChange={closeMenu}
            />
          </li>
        </ul>
      </nav>
    </>
  );
}
