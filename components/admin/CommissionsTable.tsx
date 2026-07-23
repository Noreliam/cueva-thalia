'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { CommissionWithInfluenceur } from '@/lib/influenceurs/list-commissions';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function formatEuro(amount: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount);
}

function statusLabel(statut: string) {
  if (statut === 'payée') {
    return 'Payée';
  }
  return 'En attente';
}

function MarkPaidButton({ commissionId }: { commissionId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/admin/commissions/${commissionId}/mark-paid`, {
        method: 'POST',
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setError(result.error ?? 'Échec');
        setIsLoading(false);
        return;
      }

      router.refresh();
    } catch {
      setError('Échec');
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClick}
        disabled={isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? '…' : 'Marquer payée'}
      </button>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
}

export function CommissionsTable({ commissions }: { commissions: CommissionWithInfluenceur[] }) {
  return (
    <div className="dashboard-table-wrap">
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Influenceur</th>
            <th>Email</th>
            <th>Date réservation</th>
            <th>Montant</th>
            <th>Commission due</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {commissions.map((row) => (
            <tr key={row.id}>
              <td>{row.influenceur_nom}</td>
              <td>{row.influenceur_email}</td>
              <td>{formatDate(row.created_at)}</td>
              <td>{formatEuro(row.montant_reservation)}</td>
              <td>{formatEuro(row.commission_due)}</td>
              <td>
                <span
                  className={
                    row.statut === 'payée'
                      ? 'admin-commission-status admin-commission-status--paid'
                      : 'admin-commission-status admin-commission-status--pending'
                  }
                >
                  {statusLabel(row.statut)}
                </span>
              </td>
              <td>
                {row.statut === 'en_attente' ? (
                  <MarkPaidButton commissionId={row.id} />
                ) : (
                  '—'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
