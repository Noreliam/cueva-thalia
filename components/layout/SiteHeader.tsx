'use client';

import { useEffect, useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { isHomePath, siteNavItems } from '@/lib/site-nav';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = isHomePath(pathname);

  useScrollSpy(onHome);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const NavLink = ({ hash, label, className }: { hash: string; label: string; className?: string }) =>
    onHome ? (
      <a href={hash} className={className}>
        {label}
      </a>
    ) : (
      <Link href={`/${hash}` as '/'} className={className}>
        {label}
      </Link>
    );

  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu principal
      </a>

      <header className="header" id="header">
        <div className="nav-container">
          <Link href="/" className="logo-container" aria-label="Accueil Cueva Thalía">
            <span className="logo-text">Cueva Thalía</span>
          </Link>

          <nav className="desktop-nav" aria-label="Menu principal">
            <ul>
              {siteNavItems.map((item) => (
                <li key={item.hash}>
                  <NavLink hash={item.hash} label={item.label} />
                </li>
              ))}
              <li>
                <NavLink hash="#sejour" label="Réserver" className="nav-cta" />
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
            <li key={item.hash}>
              {onHome ? (
                <a href={item.hash} className="mobile-link" onClick={() => setMenuOpen(false)}>
                  {item.label === 'Événements' ? 'Événements privés' : item.label}
                </a>
              ) : (
                <Link href={`/${item.hash}` as '/'} className="mobile-link" onClick={() => setMenuOpen(false)}>
                  {item.label === 'Événements' ? 'Événements privés' : item.label}
                </Link>
              )}
            </li>
          ))}
          <li style={{ marginTop: 32 }}>
            {onHome ? (
              <a
                href="#sejour"
                className="btn btn-primary mobile-link"
                style={{ color: 'white', fontFamily: 'var(--font-body)', fontSize: 16 }}
                onClick={() => setMenuOpen(false)}
              >
                Réserver
              </a>
            ) : (
              <Link
                href="/#sejour"
                className="btn btn-primary mobile-link"
                style={{ color: 'white', fontFamily: 'var(--font-body)', fontSize: 16 }}
                onClick={() => setMenuOpen(false)}
              >
                Réserver
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}
