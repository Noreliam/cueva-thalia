import { NewsletterExportButton } from '@/components/dashboard/NewsletterExportButton';
import { listNewsletterSubscribers } from '@/lib/newsletter/list-subscribers';
import { isSupabaseConfigured } from '@/lib/supabase/server';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Newsletter — Dashboard Cueva Thalía',
  robots: { index: false, follow: false, noarchive: true },
};

const SOURCE_LABELS: Record<string, string> = {
  popup_welcome: 'Pop-up bienvenue',
  popup_exit: 'Pop-up sortie',
};

const LOCALE_LABELS: Record<string, string> = {
  fr: 'Français',
  es: 'Espagnol',
  en: 'Anglais',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function DashboardNewsletterPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('ct_dashboard_session');

  if (!session?.value) {
    return (
      <main className="dashboard-page">
        <div className="container" style={{ maxWidth: 480, padding: '120px 20px' }}>
          <h1>Newsletter</h1>
          <p className="editorial-text">Accès réservé à Manon.</p>
          <Link href="/dashboard" className="btn btn-primary" style={{ marginTop: 24 }}>
            Retour au dashboard
          </Link>
        </div>
      </main>
    );
  }

  const configured = isSupabaseConfigured();
  let subscribers: Awaited<ReturnType<typeof listNewsletterSubscribers>> = [];
  let loadError: string | null = null;

  if (configured) {
    try {
      subscribers = await listNewsletterSubscribers();
    } catch {
      loadError = 'Impossible de charger la liste. Vérifiez que la migration Supabase a bien été exécutée.';
    }
  }

  return (
    <main className="dashboard-page">
      <div className="container" style={{ padding: '80px 20px', maxWidth: 960 }}>
        <Link href="/dashboard" className="small-caps" style={{ display: 'inline-block', marginBottom: 24 }}>
          ← Dashboard
        </Link>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <h1>Inscrits newsletter</h1>
            <p className="editorial-text" style={{ marginTop: 8 }}>
              Emails collectés via les pop-ups code promo WELCOME10.
            </p>
          </div>
          <NewsletterExportButton subscribers={subscribers} />
        </div>

        {!configured && (
          <div className="dashboard-notice">
            <p>
              <strong>Supabase non configuré.</strong> Ajoutez les variables{' '}
              <code>NEXT_PUBLIC_SUPABASE_URL</code> et <code>SUPABASE_SERVICE_ROLE_KEY</code> dans{' '}
              <code>.env.local</code>, puis exécutez la migration SQL (voir <code>supabase/README.md</code>).
            </p>
          </div>
        )}

        {loadError && (
          <div className="dashboard-notice dashboard-notice--error">
            <p>{loadError}</p>
          </div>
        )}

        {configured && !loadError && subscribers.length === 0 && (
          <p className="editorial-text">Aucun inscrit pour le moment.</p>
        )}

        {subscribers.length > 0 && (
          <div className="dashboard-table-wrap">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Langue</th>
                  <th>Source</th>
                  <th>Code</th>
                  <th>Inscription</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((row) => (
                  <tr key={row.id}>
                    <td>{row.email}</td>
                    <td>{LOCALE_LABELS[row.locale] ?? row.locale}</td>
                    <td>{SOURCE_LABELS[row.source] ?? row.source}</td>
                    <td>{row.welcome_code}</td>
                    <td>{formatDate(row.subscribed_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <p className="small-caps" style={{ marginTop: 40 }}>
          Accès alternatif : Supabase → Table Editor → <code>newsletter_subscribers</code>
        </p>
      </div>
    </main>
  );
}
