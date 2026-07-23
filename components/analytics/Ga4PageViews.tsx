'use client';

import { syncAnalyticsConsentFromStorage, trackPageView } from '@/lib/analytics/ga4';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

function Ga4PageViewsInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    syncAnalyticsConsentFromStorage();
  }, []);

  useEffect(() => {
    const query = searchParams.toString();
    const path = query ? `${pathname}?${query}` : pathname;
    trackPageView(path);
  }, [pathname, searchParams]);

  return null;
}

export function Ga4PageViews() {
  return (
    <Suspense fallback={null}>
      <Ga4PageViewsInner />
    </Suspense>
  );
}
