'use client';

import { useEffect, useState } from 'react';
import { Link, usePathname } from '@/i18n/routing';

const navLinks = [
  { href: '/sejourner' as const, label: 'Séjourner' },
  { href: '/evenements-prives' as const, label: 'Événements' },
  { href: '/workshops-retraites' as const, label: 'Workshops' },
  { href: '/galerie' as const, label: 'Galerie' },
  { href: '/contact' as const, label: 'Contact' },
];

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#main">
        Aller au contenu principal
      </a>

      <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
        <div className="nav-container">
          <Link href="/" className="logo-container" aria-label="Accueil Cueva Thalía">
            <span className="logo-text">Cueva Thalía</span>
          </Link>

          <nav className="desktop-nav" aria-label="Menu principal">
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={pathname === link.href ? 'active' : undefined}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/sejourner" className="nav-cta">
                  Réserver
                </Link>
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
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="mobile-link" onClick={() => setMenuOpen(false)}>
                {link.label === 'Événements' ? 'Événements privés' : link.label}
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
              Réserver
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
