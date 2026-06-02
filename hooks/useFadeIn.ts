'use client';

import { useEffect } from 'react';

function isInViewport(el: Element) {
  const rect = el.getBoundingClientRect();
  const viewHeight = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < viewHeight - 40 && rect.bottom > 40;
}

export function useFadeIn() {
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-in');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      fadeElements.forEach((el) => el.classList.add('visible'));
      return;
    }

    fadeElements.forEach((el) => {
      if (isInViewport(el)) {
        el.classList.add('visible');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 0px 0px' }
    );

    fadeElements.forEach((el) => {
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });

    const fallback = window.setTimeout(() => {
      fadeElements.forEach((el) => el.classList.add('visible'));
    }, 2000);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);
}
