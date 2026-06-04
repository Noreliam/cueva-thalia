'use client';

import { useCallback, useEffect, useRef } from 'react';

type HeroBackgroundVideoProps = {
  forwardSrc: string;
  reverseSrc: string;
};

export function HeroBackgroundVideo({ forwardSrc, reverseSrc }: HeroBackgroundVideoProps) {
  const forwardRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);

  const setActive = useCallback((active: 'forward' | 'reverse') => {
    const forward = forwardRef.current;
    const reverse = reverseRef.current;
    if (!forward || !reverse) return;

    if (active === 'forward') {
      forward.style.opacity = '1';
      reverse.style.opacity = '0';
      reverse.pause();
    } else {
      forward.style.opacity = '0';
      reverse.style.opacity = '1';
      forward.pause();
    }
  }, []);

  useEffect(() => {
    const forward = forwardRef.current;
    const reverse = reverseRef.current;
    if (!forward || !reverse) return;

    const playForward = () => {
      setActive('forward');
      forward.currentTime = 0;
      void forward.play().catch(() => {});
    };

    const playReverse = () => {
      setActive('reverse');
      reverse.currentTime = 0;
      void reverse.play().catch(() => {});
    };

    const onForwardEnded = () => playReverse();
    const onReverseEnded = () => playForward();

    forward.addEventListener('ended', onForwardEnded);
    reverse.addEventListener('ended', onReverseEnded);

    const tryStart = () => {
      if (forward.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        playForward();
      }
    };

    forward.addEventListener('loadeddata', tryStart);
    if (forward.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) tryStart();

    return () => {
      forward.removeEventListener('ended', onForwardEnded);
      reverse.removeEventListener('ended', onReverseEnded);
      forward.removeEventListener('loadeddata', tryStart);
    };
  }, [forwardSrc, reverseSrc, setActive]);

  const videoProps = {
    muted: true,
    playsInline: true,
    preload: 'auto' as const,
    'aria-hidden': true,
  };

  return (
    <>
      <video
        ref={forwardRef}
        className="hero-bg-video hero-bg-video--active"
        src={forwardSrc}
        autoPlay
        {...videoProps}
      />
      <video
        ref={reverseRef}
        className="hero-bg-video hero-bg-video--reverse"
        src={reverseSrc}
        {...videoProps}
      />
    </>
  );
}
