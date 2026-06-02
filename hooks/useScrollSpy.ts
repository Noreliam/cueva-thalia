'use client';

import { useEffect } from 'react';

/** Active les liens du menu desktop selon la section visible (comme index.html). */
export function useScrollSpy(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const desktopLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');

    const onScroll = () => {
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
      }

      let current = '';
      sections.forEach((section) => {
        const el = section as HTMLElement;
        if (window.scrollY >= el.offsetTop - 150) {
          current = el.id;
        }
      });

      desktopLinks.forEach((link) => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${current}` && !link.classList.contains('nav-cta')) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [enabled]);
}
