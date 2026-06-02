import '@/app/site.css';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ background: 'var(--ct-blanc-casse)', color: 'var(--ct-brun-chaud)' }}>{children}</body>
    </html>
  );
}
