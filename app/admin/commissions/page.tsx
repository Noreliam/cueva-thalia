import { CommissionsLoginForm } from '@/components/admin/CommissionsLoginForm';
import { CommissionsTable } from '@/components/admin/CommissionsTable';
import {
  getCommissionsAdminPassword,
  isCommissionsAdminSessionActive,
} from '@/lib/admin/commissions-auth';
import { listCommissionsWithInfluenceurs } from '@/lib/influenceurs/list-commissions';
import { isSupabaseConfigured } from '@/lib/supabase/server';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commissions influenceurs — Admin Cueva Thalía',
  robots: { index: false, follow: false, noarchive: true },
};

export default async function AdminCommissionsPage() {
  const passwordConfigured = Boolean(getCommissionsAdminPassword());
  const authenticated = await isCommissionsAdminSessionActive();

  if (!passwordConfigured) {
    return (
      <main className="dashboard-page">
        <div className="container" style={{ maxWidth: 560, padding: '120px 20px' }}>
          <h1>Commissions influenceurs</h1>
          <div className="dashboard-notice dashboard-notice--error">
            <p>
              Définissez la variable <code>ADMIN_COMMISSIONS_PASSWORD</code> dans{' '}
              <code>.env.local</code> (et sur Netlify) pour activer l&apos;accès.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="dashboard-page">
        <div className="container" style={{ maxWidth: 480, padding: '120px 20px' }}>
          <h1>Commissions influenceurs</h1>
          <p className="editorial-text" style={{ marginBottom: 24 }}>
            Accès réservé à l&apos;administration.
          </p>
          <CommissionsLoginForm />
        </div>
      </main>
    );
  }

  const configured = isSupabaseConfigured();
  let commissions: Awaited<ReturnType<typeof listCommissionsWithInfluenceurs>> = [];
  let loadError: string | null = null;

  if (configured) {
    try {
      commissions = await listCommissionsWithInfluenceurs();
    } catch {
      loadError =
        'Impossible de charger les commissions. Vérifiez que les tables Supabase existent.';
    }
  }

  const pendingTotal = commissions
    .filter((row) => row.statut === 'en_attente')
    .reduce((sum, row) => sum + row.commission_due, 0);

  return (
    <main className="dashboard-page">
      <div className="container" style={{ padding: '80px 20px', maxWidth: 1120 }}>
        <h1>Commissions influenceurs</h1>
        <p className="editorial-text" style={{ marginTop: 8, marginBottom: 32 }}>
          Suivi des commissions générées par les codes influenceurs lors des réservations Stripe.
        </p>

        {!configured && (
          <div className="dashboard-notice">
            <p>
              <strong>Supabase non configuré.</strong> Ajoutez{' '}
              <code>NEXT_PUBLIC_SUPABASE_URL</code> et <code>SUPABASE_SERVICE_ROLE_KEY</code>.
            </p>
          </div>
        )}

        {loadError && (
          <div className="dashboard-notice dashboard-notice--error">
            <p>{loadError}</p>
          </div>
        )}

        {configured && !loadError && commissions.length > 0 && (
          <p className="small-caps" style={{ marginBottom: 24 }}>
            {commissions.length} commission{commissions.length > 1 ? 's' : ''} —{' '}
            {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(
              pendingTotal,
            )}{' '}
            en attente
          </p>
        )}

        {configured && !loadError && commissions.length === 0 && (
          <p className="editorial-text">Aucune commission enregistrée pour le moment.</p>
        )}

        {commissions.length > 0 && <CommissionsTable commissions={commissions} />}
      </div>
    </main>
  );
}
