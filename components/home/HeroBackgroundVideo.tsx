'use client';

import { useEffect, useRef } from 'react';

type HeroBackgroundVideoProps = {
  src: string;
};

export function HeroBackgroundVideo({ src }: HeroBackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let rafId = 0;
    const reverseStepSeconds = 1 / 30;

    const playForward = () => {
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    const reverseStep = () => {
      if (video.currentTime <= reverseStepSeconds) {
        video.currentTime = 0;
        playForward();
        return;
      }
      video.currentTime = Math.max(0, video.currentTime - reverseStepSeconds);
      rafId = requestAnimationFrame(reverseStep);
    };

    const onEnded = () => {
      video.pause();
      cancelAnimationFrame(rafId);
      reverseStep();
    };

    const onLoaded = () => playForward();

    video.addEventListener('ended', onEnded);
    video.addEventListener('loadeddata', onLoaded);
    if (video.readyState >= 2) playForward();

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('loadeddata', onLoaded);
      cancelAnimationFrame(rafId);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      className="hero-bg-video"
      src={src}
      muted
      playsInline
      autoPlay
      preload="auto"
      aria-hidden="true"
    />
  );
}
