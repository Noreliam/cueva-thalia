'use client';

import { BookNowLink, SocialLinksInline } from '@/components/layout/SocialLinks';
import { TurnstileField, type TurnstileFieldHandle } from '@/components/forms/TurnstileField';
import { useSecureFormSubmit } from '@/hooks/useSecureFormSubmit';
import {
  EXIT_POPUP_DISMISSED_KEY,
  WELCOME_DISCOUNT_CODE,
  WELCOME_POPUP_DISMISSED_KEY,
  isPopupSuppressed,
  markNewsletterSubscribed,
  markPopupDismissed,
} from '@/lib/newsletter/constants';
import type { NewsletterSource } from '@/lib/newsletter/subscribers';
import { useLocale, useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

const WELCOME_BG = '/photos/optimized/home-galerie/02-piscine.jpg';
const WELCOME_DELAY_MS = 10_000;
const EXIT_INACTIVITY_MS = 60_000;

type PopupKind = 'welcome' | 'exit';

function PopupShell({
  kind,
  onClose,
  children,
}: {
  kind: PopupKind;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const t = useTranslations('Popup');

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className={`newsletter-popup newsletter-popup--${kind}`}
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="newsletter-popup-panel">
        <button type="button" className="newsletter-popup-close" onClick={onClose} aria-label={t('close')}>
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

function NewsletterForm({
  compact = false,
  source,
  onSuccess,
}: {
  compact?: boolean;
  source: NewsletterSource;
  onSuccess: () => void;
}) {
  const t = useTranslations('Popup');
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [gdpr, setGdpr] = useState(false);
  const [success, setSuccess] = useState(false);
  const turnstileRef = useRef<TurnstileFieldHandle>(null);
  const { status, submit, setTurnstileToken, hp, setHp } = useSecureFormSubmit({
    endpoint: '/api/forms/newsletter',
    onSuccess: () => {
      markNewsletterSubscribed();
      setSuccess(true);
      onSuccess();
    },
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!gdpr || !email.trim()) {
      return;
    }

    try {
      const token = await turnstileRef.current?.getToken();
      if (token) {
        setTurnstileToken(token);
      }
    } catch {
      return;
    }

    await submit({ email: email.trim(), locale, source, gdprAccepted: true });
  };

  if (success) {
    return (
      <div className="newsletter-popup-success">
        <p className="newsletter-popup-emoji">🎉</p>
        <h3>{t('welcome_success_title')}</h3>
        <p>{t('welcome_success_code_label')}</p>
        <p className="newsletter-popup-code">{WELCOME_DISCOUNT_CODE}</p>
        <p>{t('welcome_success_text')}</p>
        <p className="small-caps">{t('welcome_success_validity')}</p>
        <BookNowLink className="btn btn-primary">{t('welcome_success_cta')}</BookNowLink>
        <SocialLinksInline />
      </div>
    );
  }

  return (
    <form className={`newsletter-popup-form${compact ? ' newsletter-popup-form--compact' : ''}`} onSubmit={handleSubmit}>
      <input type="text" name="_hp" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="form-honeypot" />
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t('email_placeholder')}
        className="newsletter-popup-input"
      />
      <label className="newsletter-popup-gdpr">
        <input type="checkbox" checked={gdpr} onChange={(e) => setGdpr(e.target.checked)} required />
        <span>{t('gdpr_label')}</span>
      </label>
      <TurnstileField ref={turnstileRef} onTokenChange={setTurnstileToken} executeOnSubmit />
      <button type="submit" className="btn btn-primary" disabled={status === 'loading' || !gdpr}>
        {compact ? t('exit_cta') : t('welcome_cta')}
      </button>
      {!compact && <p className="newsletter-popup-disclaimer">{t('welcome_disclaimer')}</p>}
      {status === 'error' && <p className="newsletter-popup-error">Error — please try again.</p>}
    </form>
  );
}

export default function NewsletterPopups() {
  const t = useTranslations('Popup');
  const [showWelcome, setShowWelcome] = useState(false);
  const [showExit, setShowExit] = useState(false);
  const exitShownRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeWelcome = useCallback(() => {
    markPopupDismissed(WELCOME_POPUP_DISMISSED_KEY);
    setShowWelcome(false);
  }, []);

  const closeExit = useCallback(() => {
    markPopupDismissed(EXIT_POPUP_DISMISSED_KEY);
    setShowExit(false);
  }, []);

  const tryShowExit = useCallback(() => {
    if (exitShownRef.current || showWelcome || showExit) {
      return;
    }
    if (isPopupSuppressed(EXIT_POPUP_DISMISSED_KEY)) {
      return;
    }
    exitShownRef.current = true;
    setShowExit(true);
  }, [showWelcome, showExit]);

  useEffect(() => {
    if (isPopupSuppressed(WELCOME_POPUP_DISMISSED_KEY)) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (!isPopupSuppressed(WELCOME_POPUP_DISMISSED_KEY)) {
        setShowWelcome(true);
      }
    }, WELCOME_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const resetInactivity = () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      inactivityTimerRef.current = setTimeout(tryShowExit, EXIT_INACTIVITY_MS);
    };

    const onMouseLeave = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        tryShowExit();
      }
    };

    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollYRef.current - 120 && currentY < 80) {
        tryShowExit();
      }
      lastScrollYRef.current = currentY;
      resetInactivity();
    };

    resetInactivity();
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('scroll', onScroll, { passive: true });
    ['mousemove', 'keydown', 'touchstart'].forEach((eventName) => {
      window.addEventListener(eventName, resetInactivity, { passive: true });
    });

    return () => {
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
      ['mousemove', 'keydown', 'touchstart'].forEach((eventName) => {
        window.removeEventListener(eventName, resetInactivity);
      });
    };
  }, [tryShowExit]);

  return (
    <>
      {showWelcome && (
        <PopupShell kind="welcome" onClose={closeWelcome}>
          <div
            className="newsletter-popup-bg"
            style={{ backgroundImage: `linear-gradient(rgba(20, 14, 10, 0.48), rgba(20, 14, 10, 0.52)), url('${WELCOME_BG}')` }}
          />
          <div className="newsletter-popup-content">
            <p className="newsletter-popup-kicker">🌿</p>
            <h2>{t('welcome_title')}</h2>
            <p className="newsletter-popup-lead">{t('welcome_subtitle')}</p>
            <p>{t('welcome_offer')}</p>
            <ul className="newsletter-popup-benefits">
              <li>✓ {t('welcome_benefit_1')}</li>
              <li>✓ {t('welcome_benefit_2')}</li>
              <li>✓ {t('welcome_benefit_3')}</li>
            </ul>
            <NewsletterForm source="popup_welcome" onSuccess={() => setTimeout(closeWelcome, 100)} />
          </div>
        </PopupShell>
      )}

      {showExit && !showWelcome && (
        <PopupShell kind="exit" onClose={closeExit}>
          <div className="newsletter-popup-content newsletter-popup-content--exit">
            <p className="newsletter-popup-kicker">🌿</p>
            <h2>{t('exit_title')}</h2>
            <p>{t('exit_subtitle')}</p>
            <p>{t('exit_offer')}</p>
            <NewsletterForm source="popup_exit" compact onSuccess={closeExit} />
          </div>
        </PopupShell>
      )}
    </>
  );
}
