'use client';

import { useState } from 'react';
import BookingForm from '@/components/booking/BookingForm';
import SmoobuWidget from '@/components/SmoobuWidget';
import { Link } from '@/i18n/routing';

type Copy = {
  label: string;
  continue: string;
  groupTitle: string;
  groupText: string;
  whatsapp: string;
  eventsLink: string;
  calendarTitle: string;
  calendarDesc: string;
  paymentTitle: string;
  paymentDesc: string;
  noscript: string;
};

export default function SmoobuBookingGate({
  copy,
  locale = 'en',
}: {
  copy: Copy;
  locale?: 'fr' | 'es' | 'en';
}) {
  const [selected, setSelected] = useState(2);
  const [confirmed, setConfirmed] = useState(false);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34657077910';

  if (!confirmed) {
    return (
      <div className="booking-gate">
        <div className="booking-gate-row">
          <label htmlFor="guest-count" className="booking-gate-label">
            {copy.label}
          </label>
          <select
            id="guest-count"
            value={selected}
            onChange={(event) => setSelected(Number(event.target.value))}
            className="booking-gate-select"
          >
            {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn-primary" onClick={() => setConfirmed(true)}>
            {copy.continue}
          </button>
        </div>
        <noscript>
          <p>{copy.noscript}</p>
          <a href={`https://wa.me/${whatsapp}`} className="btn btn-secondary">
            WhatsApp
          </a>
          <a href="mailto:contact@cueva-thalia.com">contact@cueva-thalia.com</a>
        </noscript>
      </div>
    );
  }

  if (selected > 4) {
    return (
      <div className="booking-gate booking-gate--group">
        <h3>{copy.groupTitle}</h3>
        <p className="editorial-text">{copy.groupText}</p>
        <div className="booking-gate-actions">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            {copy.whatsapp}
          </a>
          <Link href="/evenements" className="card-link">
            {copy.eventsLink}
          </Link>
        </div>
        <button type="button" className="link-subtle booking-gate-back" onClick={() => setConfirmed(false)}>
          ←
        </button>
      </div>
    );
  }

  return (
    <div className="booking-gate booking-gate--widget">
      <section className="booking-step" aria-labelledby="booking-calendar-title">
        <div className="placeholder-content">
          <h3 id="booking-calendar-title">{copy.calendarTitle}</h3>
          <p style={{ marginBottom: 24 }}>{copy.calendarDesc}</p>
        </div>
        <SmoobuWidget />
      </section>

      <section className="booking-step booking-step--payment" aria-labelledby="booking-payment-title">
        <div className="placeholder-content">
          <h3 id="booking-payment-title">{copy.paymentTitle}</h3>
          <p style={{ marginBottom: 24 }}>{copy.paymentDesc}</p>
        </div>
        <BookingForm locale={locale} guestCount={selected} />
      </section>

      <button type="button" className="link-subtle booking-gate-back" onClick={() => setConfirmed(false)}>
        ←
      </button>
    </div>
  );
}
