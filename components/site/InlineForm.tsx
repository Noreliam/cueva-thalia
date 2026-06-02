'use client';

import { FormEvent, useState } from 'react';

type InlineFormProps = {
  formId: string;
  confirmationId: string;
  action: string;
  submitLabel: string;
  confirmationText: string;
  children: React.ReactNode;
};

export function InlineForm({
  formId,
  confirmationId,
  action,
  submitLabel,
  confirmationText,
  children,
}: InlineFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) return;

    setLoading(true);
    const data = Object.fromEntries(new FormData(form));

    try {
      await fetch(action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } finally {
      setSubmitted(true);
      form.reset();
      setLoading(false);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <div className="custom-form fade-in">
      <form id={formId} onSubmit={handleSubmit} style={{ display: submitted ? 'none' : 'block' }}>
        {children}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Envoi…' : submitLabel}
        </button>
      </form>
      <div id={confirmationId} className="confirmation-message" style={{ display: submitted ? 'block' : 'none' }}>
        <p>{confirmationText}</p>
      </div>
    </div>
  );
}
