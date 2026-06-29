'use client';

import { Link } from '@/i18n/routing';
import { SOCIAL_LINKS } from '@/lib/social-links';
import { useTranslations } from 'next-intl';

export function SocialLinks({ className = '' }: { className?: string }) {
  const t = useTranslations('Footer');

  return (
    <div className={`social-links ${className}`.trim()}>
      <span className="social-links-label">{t('follow_us')}</span>
      <div className="social-links-row">
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('social_instagram')}
          className="social-link"
        >
          {t('social_instagram')}
        </a>
        <a
          href={SOCIAL_LINKS.facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('social_facebook')}
          className="social-link"
        >
          {t('social_facebook')}
        </a>
        <a
          href={SOCIAL_LINKS.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('social_tiktok')}
          className="social-link"
        >
          {t('social_tiktok')}
        </a>
      </div>
    </div>
  );
}

export function SocialLinksInline({ className = '' }: { className?: string }) {
  const t = useTranslations('Popup');

  return (
    <p className={`popup-social ${className}`.trim()}>
      {t('social_follow')}{' '}
      <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer">
        Instagram
      </a>
      {' · '}
      <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer">
        Facebook
      </a>
      {' · '}
      <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer">
        TikTok
      </a>
    </p>
  );
}

export function SocialLinksFooter() {
  return <SocialLinks className="footer-social" />;
}

export function BookNowLink({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Link href="/sejourner?from=newsletter#reservation" className={className}>
      {children}
    </Link>
  );
}
