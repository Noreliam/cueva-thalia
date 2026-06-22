'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  formatIsoDate,
  isStayAvailable,
  parseIsoDate,
  rangeBlocksNight,
  todayIso,
} from '@/lib/booking/dates';
import type { DateRange } from '@/lib/booking/ical-parse';

type Props = {
  locale?: 'fr' | 'es' | 'en';
  checkInDate: string;
  checkOutDate: string;
  onChange: (dates: { checkInDate: string; checkOutDate: string }) => void;
  disabled?: boolean;
};

type Copy = {
  loading: string;
  unavailable: string;
  hint: string;
  checkIn: string;
  checkOut: string;
  nights: string;
  prev: string;
  next: string;
  notConfigured: string;
};

const COPY: Record<'fr' | 'es' | 'en', Copy> = {
  fr: {
    loading: 'Chargement des disponibilités…',
    unavailable: 'Occupé',
    hint: 'Cliquez sur votre date d\'arrivée, puis sur votre date de départ.',
    checkIn: 'Arrivée',
    checkOut: 'Départ',
    nights: 'nuits',
    prev: 'Mois précédent',
    next: 'Mois suivant',
    notConfigured: 'Calendrier interactif indisponible — utilisez les champs date ci-dessous.',
  },
  es: {
    loading: 'Cargando disponibilidad…',
    unavailable: 'Ocupado',
    hint: 'Haga clic en la fecha de llegada y luego en la de salida.',
    checkIn: 'Llegada',
    checkOut: 'Salida',
    nights: 'noches',
    prev: 'Mes anterior',
    next: 'Mes siguiente',
    notConfigured: 'Calendario interactivo no disponible — use los campos de fecha abajo.',
  },
  en: {
    loading: 'Loading availability…',
    unavailable: 'Booked',
    hint: 'Click your check-in date, then your check-out date.',
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    nights: 'nights',
    prev: 'Previous month',
    next: 'Next month',
    notConfigured: 'Interactive calendar unavailable — use the date fields below.',
  },
};

const WEEKDAYS: Record<'fr' | 'es' | 'en', string[]> = {
  fr: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
  es: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
};

function monthStart(year: number, month: number): Date {
  return new Date(year, month, 1);
}

function buildMonthGrid(viewDate: Date): (Date | null)[] {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const first = monthStart(year, month);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [];

  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(new Date(year, month, day));
  }
  return cells;
}

function isBlockedDay(iso: string, blocked: DateRange[]): boolean {
  return blocked.some((range) => rangeBlocksNight(range, iso));
}

function isInSelectedRange(iso: string, checkIn: string, checkOut: string): boolean {
  return Boolean(checkIn && checkOut && iso >= checkIn && iso < checkOut);
}

export default function BookingDatePicker({
  locale = 'fr',
  checkInDate,
  checkOutDate,
  onChange,
  disabled = false,
}: Props) {
  const t = COPY[locale] ?? COPY.fr;
  const [blocked, setBlocked] = useState<DateRange[]>([]);
  const [configured, setConfigured] = useState(true);
  const [loading, setLoading] = useState(true);
  const [viewDate, setViewDate] = useState(() => monthStart(new Date().getFullYear(), new Date().getMonth()));

  useEffect(() => {
    let cancelled = false;
    fetch('/api/calendar/availability')
      .then((res) => res.json())
      .then((data: { configured?: boolean; blocked?: DateRange[] }) => {
        if (cancelled) return;
        setConfigured(data.configured !== false);
        setBlocked(data.blocked ?? []);
      })
      .catch(() => {
        if (!cancelled) setConfigured(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const months = useMemo(
    () => [viewDate, monthStart(viewDate.getFullYear(), viewDate.getMonth() + 1)],
    [viewDate],
  );

  const handleDayClick = useCallback(
    (iso: string) => {
      if (disabled || isBlockedDay(iso, blocked) || iso < todayIso()) return;

      if (!checkInDate || (checkInDate && checkOutDate)) {
        onChange({ checkInDate: iso, checkOutDate: '' });
        return;
      }

      if (iso <= checkInDate) {
        onChange({ checkInDate: iso, checkOutDate: '' });
        return;
      }

      const stay = isStayAvailable(checkInDate, iso, blocked);
      if (!stay.available) {
        onChange({ checkInDate: iso, checkOutDate: '' });
        return;
      }

      onChange({ checkInDate, checkOutDate: iso });
    },
    [blocked, checkInDate, checkOutDate, disabled, onChange],
  );

  const nightCount =
    checkInDate && checkOutDate
      ? Math.round(
          (parseIsoDate(checkOutDate).getTime() - parseIsoDate(checkInDate).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  if (loading) {
    return <div className="booking-calendar booking-calendar--loading">{t.loading}</div>;
  }

  if (!configured) {
    return <p className="booking-calendar booking-calendar--fallback">{t.notConfigured}</p>;
  }

  return (
    <div className="booking-calendar">
      <p className="booking-calendar-hint">{t.hint}</p>

      <div className="booking-calendar-nav">
        <button
          type="button"
          className="booking-calendar-nav-btn"
          aria-label={t.prev}
          disabled={disabled}
          onClick={() =>
            setViewDate(monthStart(viewDate.getFullYear(), viewDate.getMonth() - 1))
          }
        >
          ←
        </button>
        <button
          type="button"
          className="booking-calendar-nav-btn"
          aria-label={t.next}
          disabled={disabled}
          onClick={() =>
            setViewDate(monthStart(viewDate.getFullYear(), viewDate.getMonth() + 1))
          }
        >
          →
        </button>
      </div>

      <div className="booking-calendar-months">
        {months.map((monthDate) => {
          const title = new Intl.DateTimeFormat(locale, {
            month: 'long',
            year: 'numeric',
          }).format(monthDate);
          const cells = buildMonthGrid(monthDate);

          return (
            <div key={title} className="booking-calendar-month">
              <h4 className="booking-calendar-month-title">{title}</h4>
              <div className="booking-calendar-weekdays" aria-hidden>
                {WEEKDAYS[locale].map((label, index) => (
                  <span key={`${title}-${index}`}>{label}</span>
                ))}
              </div>
              <div className="booking-calendar-grid" role="grid" aria-label={title}>
                {cells.map((date, index) => {
                  if (!date) {
                    return <span key={`empty-${index}`} className="booking-calendar-day is-empty" />;
                  }

                  const iso = formatIsoDate(date);
                  const blockedDay = isBlockedDay(iso, blocked);
                  const past = iso < todayIso();
                  const unavailable = blockedDay || past;
                  const isStart = checkInDate === iso;
                  const isEnd = checkOutDate === iso;
                  const inRange = isInSelectedRange(iso, checkInDate, checkOutDate);

                  return (
                    <button
                      key={iso}
                      type="button"
                      role="gridcell"
                      disabled={disabled || unavailable}
                      aria-label={iso}
                      aria-pressed={isStart || isEnd || inRange}
                      className={[
                        'booking-calendar-day',
                        unavailable ? 'is-blocked' : 'is-available',
                        inRange ? 'is-in-range' : '',
                        isStart ? 'is-range-start' : '',
                        isEnd ? 'is-range-end' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      onClick={() => handleDayClick(iso)}
                    >
                      {date.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {(checkInDate || checkOutDate) && (
        <div className="booking-calendar-summary">
          <span>
            {t.checkIn}: <strong>{checkInDate || '—'}</strong>
          </span>
          <span>
            {t.checkOut}: <strong>{checkOutDate || '—'}</strong>
          </span>
          {nightCount > 0 && (
            <span>
              {nightCount} {t.nights}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
