'use client';

import { useCallback, useState } from 'react';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

type UseSecureFormSubmitOptions = {
  endpoint: string;
  onSuccess?: () => void;
};

export function useSecureFormSubmit({ endpoint, onSuccess }: UseSecureFormSubmitOptions) {
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [turnstileToken, setTurnstileToken] = useState('');
  const [hp, setHp] = useState('');

  const submit = useCallback(
    async (data: Record<string, unknown>) => {
      if (hp.trim().length > 0) {
        setStatus('success');
        onSuccess?.();
        return;
      }

      setStatus('loading');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...data,
            _hp: hp,
            turnstileToken,
          }),
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        setStatus('success');
        onSuccess?.();
      } catch {
        setStatus('error');
      }
    },
    [endpoint, hp, onSuccess, turnstileToken],
  );

  return {
    status,
    setStatus,
    submit,
    turnstileToken,
    setTurnstileToken,
    hp,
    setHp,
  };
}
