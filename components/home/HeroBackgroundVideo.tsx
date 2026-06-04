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
    let reversing = false;
    const reverseStepSeconds = 1 / 30;

    const playForward = () => {
      reversing = false;
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    const reverseStep = () => {
      reversing = true;
      if (video.currentTime <= reverseStepSeconds) {
        video.currentTime = 0;
        playForward();
        return;
      }
      video.currentTime = Math.max(0, video.currentTime - reverseStepSeconds);
      rafId = requestAnimationFrame(reverseStep);
    };

    const onEnded = () => {
      if (reversing) return;
      video.pause();
      cancelAnimationFrame(rafId);
      reverseStep();
    };

    const onCanPlay = () => {
      if (!reversing && video.paused) playForward();
    };

    video.addEventListener('ended', onEnded);
    video.addEventListener('canplay', onCanPlay);
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) onCanPlay();

    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('canplay', onCanPlay);
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
      poster="/photos/optimized/4c8be500-7d15-4958-a5df-94e614ff3556.jpg"
      aria-hidden="true"
    />
  );
}
