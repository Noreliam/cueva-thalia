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
    let lastFrameMs = 0;

    const cancelReverse = () => {
      cancelAnimationFrame(rafId);
      rafId = 0;
      lastFrameMs = 0;
    };

    const playForward = () => {
      reversing = false;
      cancelReverse();
      video.playbackRate = 1;
      void video.play().catch(() => {});
    };

    const reverseFrame = (now: number) => {
      if (!lastFrameMs) {
        lastFrameMs = now;
        rafId = requestAnimationFrame(reverseFrame);
        return;
      }

      const delta = (now - lastFrameMs) / 1000;
      lastFrameMs = now;

      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) {
        rafId = requestAnimationFrame(reverseFrame);
        return;
      }

      const nextTime = video.currentTime - delta;
      if (nextTime <= 0.02) {
        video.currentTime = 0;
        playForward();
        return;
      }

      video.currentTime = nextTime;
      rafId = requestAnimationFrame(reverseFrame);
    };

    const startReverse = () => {
      if (reversing) return;
      reversing = true;
      video.pause();
      cancelReverse();
      rafId = requestAnimationFrame(reverseFrame);
    };

    const onTimeUpdate = () => {
      if (reversing) return;
      const duration = video.duration;
      if (!duration || !Number.isFinite(duration)) return;
      if (video.currentTime >= duration - 0.05) {
        startReverse();
      }
    };

    const onEnded = () => {
      if (!reversing) startReverse();
    };

    const onCanPlay = () => {
      if (!reversing && video.paused) playForward();
    };

    video.addEventListener('timeupdate', onTimeUpdate);
    video.addEventListener('ended', onEnded);
    video.addEventListener('canplay', onCanPlay);
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) onCanPlay();

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate);
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('canplay', onCanPlay);
      cancelReverse();
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
