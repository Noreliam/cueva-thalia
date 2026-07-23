import { isGa4Configured } from '@/lib/analytics/ga4';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Marketing — Dashboard Cueva Thalía',
  robots: { index: false, follow: false, noarchive: true },
};

const GA4_URL = 'https://analytics.google.com/';
const GSC_URL = 'https://search.google.com/search-console';

export default async function DashboardMarketingPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('ct_dashboard_session');
  const ga4Configured = isGa4Configured();

  if (!session?.value) {
    return (
      <main className="dashboard-page">
        <div className="container" style={{ maxWidth: 480, padding: '120px 20px' }}>
          <h1>Marketing</h1>
          <p className="editorial-text">Accès réservé à Manon.</p>
          <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: 24 }}>
            Retour au dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="container" style={{ padding: '80px 20px', maxWidth: 760 }}>
        <Link href="/dashboard" className="small-caps" style={{ display: 'inline-block', marginBottom: 24 }}>
          ← Dashboard
        </Link>
        <h1>Marketing & audience</h1>
        <p className="editorial-text" style={{ marginTop: 8, marginBottom: 32 }}>
          Statistiques de trafic, clics et conversions via Google Analytics 4 (chargé uniquement après consentement cookies).
        </p>

        {!ga4Configured && (
          <div className="dashboard-notice dashboard-notice--error" style={{ marginBottom: 24 }}>
            <p>
              <strong>GA4 non configuré.</strong> Ajoutez <code>NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX</code> dans les
              variables Netlify, puis redéployez le site.
            </p>
          </div>
        )}

        <div className="dashboard-grid">
          <a href={GA4_URL} target="_blank" rel="noopener noreferrer" className="dashboard-card">
            <h2>Google Analytics 4</h2>
            <p>Pages vues, sources de trafic, clics, conversions newsletter et réservations.</p>
          </a>
          <a href={GSC_URL} target="_blank" rel="noopener noreferrer" className="dashboard-card">
            <h2>Google Search Console</h2>
            <p>Impressions et clics depuis Google, requêtes de recherche, indexation.</p>
          </a>
          <Link href="/dashboard/newsletter" className="dashboard-card">
            <h2>Inscrits newsletter</h2>
            <p>Emails collectés via les pop-ups WELCOME10 (base Supabase).</p>
          </Link>
        </div>

        <p className="small-caps" style={{ marginTop: 40 }}>
          GA4 respecte le bandeau cookies : les stats ne démarrent qu&apos;après acceptation de la mesure d&apos;audience.
        </p>
      </div>
    </main>
  );
}
