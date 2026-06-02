'use client';

import { useCustomCursor } from '@/hooks/useCustomCursor';
import { useFadeIn } from '@/hooks/useFadeIn';
import { useEffect } from 'react';

export function SiteClientEffects() {
  useFadeIn();
  useCustomCursor();

  useEffect(() => {
    document.querySelectorAll('.gallery-preview-link').forEach((link) => {
      const onEnter = () => link.classList.add('is-hovered');
      const onLeave = () => link.classList.remove('is-hovered');
      link.addEventListener('mouseenter', onEnter);
      link.addEventListener('mouseleave', onLeave);
      return () => {
        link.removeEventListener('mouseenter', onEnter);
        link.removeEventListener('mouseleave', onLeave);
      };
    });
  }, []);

  return null;
}
