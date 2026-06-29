'use client';

import { useState } from 'react';
import BookingDatePicker from '@/components/booking/BookingDatePicker';
import BookingForm from '@/components/booking/BookingForm';
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
  guestsTitle: string;
  guestsDesc: string;
  noscript: string;
};

type Step = 'calendar' | 'guests' | 'group' | 'payment';

export default function SmoobuBookingGate({
  copy,
  locale = 'en',
}: {
  copy: Copy;
  locale?: 'fr' | 'es' | 'en';
}) {
  const [step, setStep] = useState<Step>('calendar');
  const [selected, setSelected] = useState(2);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '34657077910';

  const datesSelected = Boolean(checkInDate && checkOutDate);

  const handleDatesContinue = () => {
    if (datesSelected) {
      setStep('guests');
    }
  };

  const handleGuestsContinue = () => {
    if (selected > 4) {
      setStep('group');
      return;
    }
    setStep('payment');
  };

  if (step === 'group') {
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
        <button type="button" className="link-subtle booking-gate-back" onClick={() => setStep('guests')}>
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
        <BookingDatePicker
          locale={locale}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
          onChange={({ checkInDate: inDate, checkOutDate: outDate }) => {
            setCheckInDate(inDate);
            setCheckOutDate(outDate);
            if (step !== 'calendar') {
              setStep('calendar');
            }
          }}
        />
        {step === 'calendar' && (
          <div className="booking-gate-row" style={{ marginTop: 24 }}>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!datesSelected}
              onClick={handleDatesContinue}
            >
              {copy.continue}
            </button>
          </div>
        )}
      </section>

      {(step === 'guests' || step === 'payment') && (
        <section className="booking-step" aria-labelledby="booking-guests-title">
          <div className="placeholder-content">
            <h3 id="booking-guests-title">{copy.guestsTitle}</h3>
            <p style={{ marginBottom: 24 }}>{copy.guestsDesc}</p>
          </div>
          <div className="booking-gate-row">
            <label htmlFor="guest-count" className="booking-gate-label">
              {copy.label}
            </label>
            <select
              id="guest-count"
              value={selected}
              onChange={(event) => setSelected(Number(event.target.value))}
              className="booking-gate-select"
              disabled={step === 'payment'}
            >
              {Array.from({ length: 16 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
            {step === 'guests' && (
              <button type="button" className="btn btn-primary" onClick={handleGuestsContinue}>
                {copy.continue}
              </button>
            )}
          </div>
          {step === 'payment' && (
            <button type="button" className="link-subtle booking-gate-back" onClick={() => setStep('guests')}>
              ←
            </button>
          )}
        </section>
      )}

      {step === 'payment' && (
        <section className="booking-step booking-step--payment" aria-labelledby="booking-payment-title">
          <div className="placeholder-content">
            <h3 id="booking-payment-title">{copy.paymentTitle}</h3>
            <p style={{ marginBottom: 24 }}>{copy.paymentDesc}</p>
          </div>
          <BookingForm
            locale={locale}
            guestCount={selected}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
          />
        </section>
      )}

      {step !== 'calendar' && (
        <button
          type="button"
          className="link-subtle booking-gate-back"
          onClick={() => {
            if (step === 'payment') {
              setStep('guests');
            } else {
              setStep('calendar');
            }
          }}
        >
          ←
        </button>
      )}

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
