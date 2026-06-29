import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Dashboard — Cueva Thalía',
  robots: { index: false, follow: false, noarchive: true },
};

const modules = [
  { title: 'Accueil', href: '/dashboard', desc: 'Demandes non traitées et raccourcis' },
  { title: 'Réservations', href: 'https://login.smoobu.com', desc: 'Calendrier Smoobu (externe)' },
  { title: 'Demandes', href: '/dashboard/demandes', desc: 'Formulaires événements et workshops' },
  { title: 'Paiements', href: '/dashboard/paiements', desc: 'Suivi manuel acomptes et soldes' },
  { title: 'Facturation', href: '#', desc: 'Outil gestor [PLACEHOLDER]' },
  { title: 'Médias', href: '#', desc: 'Google Drive Manon [URL à renseigner]' },
  { title: 'Documents', href: '/dashboard/documents', desc: 'Conditions, FAQ, modèles WhatsApp' },
  { title: 'Marketing', href: '/dashboard/marketing', desc: 'GA4, GSC, calendrier éditorial' },
  { title: 'Newsletter', href: '/dashboard/newsletter', desc: 'Inscrits pop-up WELCOME10 — emails et export CSV' },
];

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('ct_dashboard_session');

  if (!session?.value) {
    return (
      <main className="dashboard-page">
        <div className="container" style={{ maxWidth: 480, padding: '120px 20px' }}>
          <h1>Dashboard Cueva Thalía</h1>
          <p className="editorial-text">Accès réservé à Manon. Authentification à brancher (cookie signé + Supabase).</p>
          <p className="small-caps" style={{ marginTop: 24 }}>
            [PLACEHOLDER — connecter l&apos;auth serveur avant mise en production]
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <div className="container" style={{ padding: '80px 20px' }}>
        <h1>Dashboard</h1>
        <p className="small-caps" style={{ marginBottom: 40 }}>
          {new Date().toLocaleString('fr-FR')}
        </p>
        <div className="dashboard-grid">
          {modules.map((mod) => (
            <Link key={mod.title} href={mod.href} className="dashboard-card">
              <h2>{mod.title}</h2>
              <p>{mod.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
