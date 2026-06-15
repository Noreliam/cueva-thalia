'use client';

import Image from 'next/image';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import GiftCardForm from '@/components/forms/GiftCardForm';
import './bon-cadeau.css';

const HERO_IMAGE = '/photos/optimized/bon-cadeau-hero.png';

/** Petit ornement type goutte / feuille (maquette) */
function Ornament({ className, size = 14 }: { className?: string; size?: number }) {
  const height = Math.round(size * (22 / 16));
  return (
    <svg
      className={className}
      width={size}
      height={height}
      viewBox="0 0 16 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8 2.5c-3.2 4.8-4.8 9.2-4.2 13.2.5 3.2 2.4 5.3 4.2 5.3s3.7-2.1 4.2-5.3c.6-4-1-8.4-4.2-13.2z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export type BonCadeauCopy = {
  heroTitle: string;
  heroLead: string;
  cta: string;
  validity: string;
  formTitle: string;
  closeModal: string;
  backHome: string;
};

export default function BonCadeauPageContent({ copy }: { copy: BonCadeauCopy }) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  const openModal = useCallback(() => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#commander`);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = '';
    if (window.location.hash === '#commander') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    if (window.location.hash === '#commander') {
      setModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modalOpen, closeModal]);

  useEffect(() => {
    if (!modalOpen || !modalRef.current) return;
    modalRef.current.querySelector<HTMLElement>('input, select, textarea, button')?.focus();
  }, [modalOpen]);

  return (
    <>
      <section className="bc-hero" aria-labelledby="bc-hero-title">
        <div className="bc-hero__media">
          <Image
            src={HERO_IMAGE}
            alt=""
            fill
            priority
            sizes="(min-width: 900px) 60vw, 100vw"
            className="bc-hero__img"
          />
        </div>

        <div className="bc-hero__overlay" aria-hidden />

        <div className="bc-hero__panel">
          <div className="bc-hero__inner">
            <h1 id="bc-hero-title" className="bc-hero__title">
              {copy.heroTitle}
            </h1>

            <div className="bc-hero__rule" aria-hidden>
              <span className="bc-hero__rule-line" />
              <Ornament className="bc-hero__ornament" />
              <span className="bc-hero__rule-line" />
            </div>

            <p className="bc-hero__lead">{copy.heroLead}</p>

            <button type="button" className="bc-hero__cta" onClick={openModal}>
              {copy.cta}
            </button>

            <p className="bc-hero__note">
              <Ornament className="bc-hero__note-ornament" size={10} />
              <span>{copy.validity}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="bc-page-foot">
        <div className="container">
          <p>
            <Link href="/" className="card-link">
              {copy.backHome}
            </Link>
          </p>
        </div>
      </div>

      {modalOpen && (
        <div
          className="bc-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bc-modal__panel" ref={modalRef}>
            <button type="button" className="bc-modal__close" onClick={closeModal} aria-label={copy.closeModal}>
              ×
            </button>
            <h2 id={titleId} className="bc-modal__title">
              {copy.formTitle}
            </h2>
            <div className="custom-form bc-modal__form">
              <GiftCardForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
