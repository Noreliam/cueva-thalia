import SmoobuBookingGate from '@/components/SmoobuBookingGate';

type Copy = {
  reservationTitle: string;
  reservationLead: string;
  capacityTitle: string;
  capacityStandard: string;
  capacityDetailsSummary: string;
  capacityDetailsBody: string;
  ratesTitle: string;
  rateWeekdayLabel: string;
  rateWeekendLabel: string;
  ratePerNight: string;
  ratesFootnote: string;
  checkinCheckout: string;
  deposit: string;
  ctaWhatsappQuote: string;
  bookingGuests: string;
  bookingContinue: string;
  bookingGroupTitle: string;
  bookingGroupText: string;
  bookingWhatsapp: string;
  bookingEventsLink: string;
  bookingCalendarTitle: string;
  bookingCalendarDesc: string;
  bookingPaymentTitle: string;
  bookingPaymentDesc: string;
  bookingGuestsTitle: string;
  bookingGuestsDesc: string;
  bookingNoscript: string;
  whatsappHref: string;
};

export function SejournerBookingSection({
  copy,
  locale,
}: {
  copy: Copy;
  locale: 'fr' | 'es' | 'en';
}) {
  return (
    <div className="booking-layout fade-in">
      <div className="booking-panel">
        <header className="booking-panel-header">
          <h2 className="booking-panel-title">{copy.reservationTitle}</h2>
          <p className="booking-panel-lead">{copy.reservationLead}</p>
        </header>
        <SmoobuBookingGate
          locale={locale}
          copy={{
            label: copy.bookingGuests,
            continue: copy.bookingContinue,
            groupTitle: copy.bookingGroupTitle,
            groupText: copy.bookingGroupText,
            whatsapp: copy.bookingWhatsapp,
            eventsLink: copy.bookingEventsLink,
            calendarTitle: copy.bookingCalendarTitle,
            calendarDesc: copy.bookingCalendarDesc,
            paymentTitle: copy.bookingPaymentTitle,
            paymentDesc: copy.bookingPaymentDesc,
            guestsTitle: copy.bookingGuestsTitle,
            guestsDesc: copy.bookingGuestsDesc,
            noscript: copy.bookingNoscript,
          }}
        />
      </div>

      <aside className="tarifs-aside" aria-label={copy.ratesTitle}>
        <h3>{copy.ratesTitle}</h3>
        <div className="tarifs-aside-rates">
          <div className="tarif-row">
            <span>{copy.rateWeekdayLabel}</span>
            <span>
              200 € <span className="tarif-row-unit">{copy.ratePerNight}</span>
            </span>
          </div>
          <div className="tarif-row">
            <span>{copy.rateWeekendLabel}</span>
            <span>
              250 € <span className="tarif-row-unit">{copy.ratePerNight}</span>
            </span>
          </div>
        </div>
        <p className="tarifs-aside-note">{copy.ratesFootnote}</p>

        <h3>{copy.capacityTitle}</h3>
        <p className="tarifs-aside-line">{copy.capacityStandard}</p>
        <details className="tarifs-aside-details">
          <summary>{copy.capacityDetailsSummary}</summary>
          <p>{copy.capacityDetailsBody}</p>
        </details>

        <p className="tarifs-aside-meta">{copy.checkinCheckout}</p>
        <p className="tarifs-aside-meta">{copy.deposit}</p>

        <a
          href={copy.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="card-link tarifs-aside-link"
        >
          {copy.ctaWhatsappQuote}
        </a>
      </aside>
    </div>
  );
}
