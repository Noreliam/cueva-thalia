'use client';

import { useEffect, useState } from 'react';

type Review = { author: string; text: string };

export function HeroReviewRotator({ reviews }: { reviews: Review[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((current) => (current + 1) % reviews.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const review = reviews[index];
  if (!review) return null;

  return (
    <p className={`hero-proof${visible ? ' hero-proof--visible' : ''}`} aria-live="polite">
      <span className="hero-proof-stars" aria-hidden="true">
        ★★★★★
      </span>{' '}
      &ldquo;{review.text}&rdquo; — {review.author}
    </p>
  );
}
