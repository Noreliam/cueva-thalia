'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/sejourner', label: 'Séjourner' },
    { href: '/evenements-prives', label: 'Événements' },
    { href: '/workshops-retraites', label: 'Workshops' },
    { href: '/galerie', label: 'Galerie' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
          isScrolled 
            ? 'bg-[var(--color-blanc-casse)] shadow-[var(--shadow-warm-sm)] text-[var(--color-brun-chaud)]' 
            : 'bg-transparent text-[var(--color-brun-chaud)]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="font-cormorant text-2xl font-semibold tracking-wider hover:opacity-80 transition-opacity">
            CUEVA THALÍA
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href as any}
                className={`font-sans text-xs tracking-[0.1em] uppercase transition-colors hover:text-[var(--color-terracotta)] ${
                  pathname === link.href ? 'text-[var(--color-terracotta)]' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/reserver"
              className="ml-4 px-6 py-2 border border-[var(--color-brun-chaud)] text-[var(--color-brun-chaud)] hover:bg-[var(--color-brun-chaud)] hover:text-[var(--color-sable)] text-xs uppercase tracking-[0.1em] rounded transition-all duration-300"
            >
              Réserver
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[var(--color-brun-chaud)]"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu strokeWidth={1} size={32} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[var(--color-brun-chaud)] z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
              className="fixed top-0 right-0 bottom-0 w-[85vw] max-w-sm bg-[var(--color-sable)] z-50 shadow-[-10px_0_30px_rgba(90,56,37,0.1)] flex flex-col md:hidden"
            >
              <div className="flex justify-end p-6 h-24 items-center">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[var(--color-brun-chaud)]"
                  aria-label="Close Menu"
                >
                  <X strokeWidth={1} size={32} />
                </button>
              </div>

              <nav className="flex-1 px-8 py-4 flex flex-col gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href as any}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-cormorant text-4xl text-[var(--color-brun-chaud)] hover:text-[var(--color-terracotta)] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="p-8 pb-12 mt-auto">
                <Link
                  href="/reserver"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-4 text-center bg-[var(--color-terracotta)] text-[var(--color-blanc-casse)] text-sm uppercase tracking-[0.1em] rounded hover:bg-[var(--color-brun-chaud)] transition-colors"
                >
                  Réserver en direct
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
