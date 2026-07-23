'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function CommissionsLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/commissions/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        setError(result.error ?? 'Connexion impossible');
        setIsLoading(false);
        return;
      }

      router.refresh();
    } catch {
      setError('Connexion impossible');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="site-form" style={{ maxWidth: 360 }}>
      <div className="form-group">
        <label htmlFor="admin-commissions-password">Mot de passe</label>
        <input
          id="admin-commissions-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      {error && (
        <div className="form-alert form-alert--error" role="alert">
          {error}
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={isLoading} aria-busy={isLoading}>
        {isLoading ? 'Connexion…' : 'Accéder'}
      </button>
    </form>
  );
}
