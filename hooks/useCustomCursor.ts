'use client';

import { useEffect } from 'react';

const INTERACTIVE =
  'a, button, .btn, input, textarea, select, label[for], [role="button"], .gallery-item, .gallery-preview-item, .gallery-preview-link, .nav-cta, .whatsapp-button, .lightbox-close, .mobile-burger';

export function useCustomCursor() {
  useEffect(() => {
    const canUseCustomCursor =
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canUseCustomCursor) return;

    const ring = document.createElement('div');
    ring.className = 'ct-cursor';
    ring.setAttribute('aria-hidden', 'true');

    const dot = document.createElement('div');
    dot.className = 'ct-cursor-dot';
    dot.setAttribute('aria-hidden', 'true');

    document.body.appendChild(ring);
    document.body.appendChild(dot);
    document.body.classList.add('ct-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;
    let hovering = false;
    let pressing = false;
    let rafId: number | null = null;

    const setVisible = (show: boolean) => {
      visible = show;
      ring.style.opacity = show ? '1' : '0';
      dot.style.opacity = show ? '1' : '0';
    };

    const updateHoverState = (target: EventTarget | null) => {
      const interactive =
        target instanceof Element ? target.closest(INTERACTIVE) : null;
      hovering = Boolean(interactive);
      ring.classList.toggle('is-hover', hovering);
      ring.classList.toggle('is-pressed', pressing);
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
      rafId = requestAnimationFrame(tick);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);
      updateHoverState(e.target);
    };

    const onMouseOver = (e: MouseEvent) => updateHoverState(e.target);

    const onMouseDown = () => {
      pressing = true;
      ring.classList.add('is-pressed');
    };

    const onMouseUp = () => {
      pressing = false;
      ring.classList.toggle('is-pressed', hovering);
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    setVisible(false);
    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      ring.remove();
      dot.remove();
      document.body.classList.remove('ct-custom-cursor');
    };
  }, []);
}
