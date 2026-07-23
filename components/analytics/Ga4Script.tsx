import Script from 'next/script';
import { getGa4Id } from '@/lib/analytics/ga4';

export function Ga4Script() {
  const gaId = getGa4Id();
  if (!gaId) {
    return null;
  }

  return (
    <>
      <Script id="ga4-consent-default" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            wait_for_update: 500
          });
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true, send_page_view: false });
        `}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
    </>
  );
}
