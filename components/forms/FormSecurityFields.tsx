'use client';

import { useState } from 'react';
import { TurnstileField } from '@/components/forms/TurnstileField';

type FormSecurityFieldsProps = {
  honeypotProps?: React.InputHTMLAttributes<HTMLInputElement>;
  onTokenChange: (token: string) => void;
};

export function FormSecurityFields({ honeypotProps, onTokenChange }: FormSecurityFieldsProps) {
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
      <TurnstileField onTokenChange={onTokenChange} />
    </>
  );
}
