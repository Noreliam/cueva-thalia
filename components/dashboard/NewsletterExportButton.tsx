'use client';

import { subscribersToCsv, type NewsletterSubscriber } from '@/lib/newsletter/list-subscribers';

export function NewsletterExportButton({ subscribers }: { subscribers: NewsletterSubscriber[] }) {
  const handleExport = () => {
    const csv = subscribersToCsv(subscribers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-cueva-thalia-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button type="button" className="btn btn-primary" onClick={handleExport} disabled={subscribers.length === 0}>
      Exporter CSV ({subscribers.length})
    </button>
  );
}
