'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

export function Lightbox() {
  const [src, setSrc] = useState<string | null>(null);

  const close = useCallback(() => {
    setSrc(null);
    document.body.style.overflow = '';
  }, []);

  const open = useCallback((imageSrc: string) => {
    setSrc(imageSrc);
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll('.gallery-item[data-src]');
    const handlers: Array<{ el: Element; fn: () => void }> = [];

    items.forEach((item) => {
      const fn = () => {
        const imageSrc = item.getAttribute('data-src');
        if (imageSrc) open(imageSrc);
      };
      item.addEventListener('click', fn);
      handlers.push({ el: item, fn });
    });

    return () => {
      handlers.forEach(({ el, fn }) => el.removeEventListener('click', fn));
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && src) close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [src, close]);

  if (!src) return null;

  return (
    <div
      id="lightbox"
      className="lightbox active"
      aria-hidden="false"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="lightbox-content">
        <button className="lightbox-close" aria-label="Fermer la galerie" onClick={close}>
          &times;
        </button>
        <Image src={src} alt="" width={1200} height={800} style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}
