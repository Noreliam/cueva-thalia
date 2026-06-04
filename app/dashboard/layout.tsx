import type { Metadata } from 'next';
import { siteIcons } from '@/lib/brand/site-icons';
import '@/app/site.css';

export const metadata: Metadata = {
  icons: siteIcons,
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ background: 'var(--ct-blanc-casse)', color: 'var(--ct-brun-chaud)' }}>{children}</body>
    </html>
  );
}
