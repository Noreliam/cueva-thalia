'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';

const SMOOBU_BASE = 'https://login.smoobu.com';

function getSmoobuCalendarLocale(siteLocale: string): string {
  if (siteLocale === 'fr' || siteLocale === 'es' || siteLocale === 'en' || siteLocale === 'de') {
    return siteLocale;
  }
  return 'es';
}

function buildCalendarIframeSrc(locale: string, apartmentId: string, verification: string): string {
  return `${SMOOBU_BASE}/${locale}/cockpit/widget/show-calendar-iframe/${apartmentId}/${verification}`;
}

export default function SmoobuWidget() {
  const [mounted, setMounted] = useState(false);
  const params = useParams();
  const siteLocale = (params?.locale as string) ?? 'es';
  const smoobuLocale = getSmoobuCalendarLocale(siteLocale);

  const apartmentId =
    process.env.NEXT_PUBLIC_SMOOBU_APARTMENT_ID?.trim() ||
    process.env.NEXT_PUBLIC_SMOOBU_WIDGET_ID?.trim();
  const verification = process.env.NEXT_PUBLIC_SMOOBU_CALENDAR_VERIFICATION?.trim();
  const iframeSrcOverride = process.env.NEXT_PUBLIC_SMOOBU_CALENDAR_IFRAME_SRC?.trim();

  const iframeSrc = useMemo(() => {
    if (iframeSrcOverride) {
      return iframeSrcOverride;
    }
    if (apartmentId && verification) {
      return buildCalendarIframeSrc(smoobuLocale, apartmentId, verification);
    }
    return null;
  }, [apartmentId, verification, iframeSrcOverride, smoobuLocale]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const href = `${SMOOBU_BASE}/css/singleCalendarWidgetIframe.css`;
    const existing = document.querySelector(`link[href="${href}"]`);
    if (existing) {
      return;
    }
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
    return () => {
      link.remove();
    };
  }, []);

  if (!mounted) {
    return <div className="smoobu-calendar-skeleton" aria-hidden />;
  }

  if (!iframeSrc) {
    return (
      <div className="p-8 text-center border border-ct-dune bg-ct-blanc-casse/50 rounded-lg">
        <p className="text-ct-brun-chaud font-medium">Calendrier de disponibilités</p>
        <p className="text-sm text-ct-brun-chaud/70 mt-2">
          Configurez{' '}
          <code className="text-xs">NEXT_PUBLIC_SMOOBU_APARTMENT_ID</code> et{' '}
          <code className="text-xs">NEXT_PUBLIC_SMOOBU_CALENDAR_VERIFICATION</code>.
        </p>
      </div>
    );
  }

  return (
    <div className="smoobu-widget-container smoobu-calendar-iframe w-full rounded-lg overflow-hidden bg-white shadow-sm border border-ct-dune/20">
      <iframe
        className="smallDevices"
        title="Calendrier Smoobu"
        src={iframeSrc}
        width="280"
        height="540"
        loading="lazy"
      />
      <iframe
        className="bigDevices"
        title="Calendrier Smoobu"
        src={iframeSrc}
        width="100%"
        height="600"
        loading="lazy"
      />
    </div>
  );
}
