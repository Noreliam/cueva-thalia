'use client';

import { useState } from 'react';
import { TurnstileField, type TurnstileFieldHandle } from '@/components/forms/TurnstileField';

type FormSecurityFieldsProps = {
  honeypotProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onTokenChange: (token: string) => void;
  turnstileRef?: React.Ref<TurnstileFieldHandle>;
  executeOnSubmit?: boolean;
};

export function FormSecurityFields({
  honeypotProps,
  onTokenChange,
  turnstileRef,
  executeOnSubmit = false,
}: FormSecurityFieldsProps) {
  const [hp, setHp] = useState('');

  return (
    <>
      <input
        type="text"
        name="_hp"
        value={hp}
        onChange={(event) => setHp(event.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="form-honeypot"
        {...honeypotProps}
      />
      <TurnstileField
        ref={turnstileRef}
        onTokenChange={onTokenChange}
        executeOnSubmit={executeOnSubmit}
      />
    </>
  );
}
