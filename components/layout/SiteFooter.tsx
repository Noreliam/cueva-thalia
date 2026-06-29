'use client';

import { Link } from '@/i18n/routing';
import { SocialLinksFooter } from '@/components/layout/SocialLinks';
import { siteNavItems } from '@/lib/site-nav';
import { useTranslations } from 'next-intl';
import LocaleSwitcher from '@/components/layout/LocaleSwitcher';

export default function SiteFooter() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Navigation');

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-contact">
          <h4>{t('contact_title')}</h4>
          <ul>
            <li>Calle Las Morales 70</li>
            <li>38620 San Miguel de Abona</li>
            <li>Tenerife, Espagne</li>
            <li style={{ marginTop: 16 }}>
              <a href="https://wa.me/34657077910" target="_blank" rel="noopener noreferrer">
                +34 657 077 910
              </a>
            </li>
            <li>
              <a href="mailto:contact@cueva-thalia.com">contact@cueva-thalia.com</a>
            </li>
          </ul>
        </div>

        <div className="footer-brand">
          <span className="footer-logo">Cueva Thalía</span>
          <p style={{ marginBottom: 16 }} className="small-caps">
            {t('tagline')}
          </p>
          <p>{t('description')}</p>
          <SocialLinksFooter />
        </div>

        <div className="footer-nav">
          <h4>{t('nav_title')}</h4>
          <ul>
            {siteNavItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {item.labelKey === 'offrir' ? `🎁 ${nav(item.labelKey)}` : nav(item.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="small-caps footer-bottom-license">{t('license')}</p>
          <div className="footer-bottom-links">
            <Link href="/mentions-legales">{t('legal')}</Link>
            <span>·</span>
            <Link href="/conditions-generales">{t('cgv')}</Link>
            <span>·</span>
            <Link href="/politique-confidentialite">{t('privacy')}</Link>
            <span>·</span>
            <Link href="/politique-annulation">{t('cancel')}</Link>
            <span>·</span>
            <Link href="/guides/sejour-insolite-tenerife">{t('guides')}</Link>
          </div>
          <LocaleSwitcher className="locale-switcher locale-switcher--footer" />
          <p className="footer-bottom-copy">
            &copy; 2025–{new Date().getFullYear()} Cueva Thalía — San Miguel de Abona, Tenerife
          </p>
        </div>
      </div>
    </footer>
  );
}
