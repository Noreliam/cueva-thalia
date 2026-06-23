import {
  getSmoobuApartmentId,
  isSmoobuConfigured,
  resolveSmoobuCustomerId,
  smoobuFetch,
} from '@/lib/smoobu/client';

type AvailabilityResponse = {
  availableApartments?: number[];
  errorMessages?: Record<
    string,
    {
      errorCode?: number;
      message?: string;
    }
  >;
};

export type SmoobuAvailabilityResult =
  | { available: true; skipped?: boolean }
  | { available: false; reason: string };

export async function checkSmoobuAvailability(params: {
  checkInDate: string;
  checkOutDate: string;
  guestCount: number;
}): Promise<SmoobuAvailabilityResult> {
  if (process.env.SMOOBU_ENABLE_API_SYNC !== 'true') {
    return { available: true, skipped: true };
  }

  if (!isSmoobuConfigured()) {
    console.warn('[SMOOBU] availability check skipped — API not configured');
    return { available: true, skipped: true };
  }

  const customerId = await resolveSmoobuCustomerId();
  if (!customerId) {
    console.warn(
      '[SMOOBU] availability check skipped — set SMOOBU_CUSTOMER_ID or ensure SMOOBU_API_KEY can access /api/me',
    );
    return { available: true, skipped: true };
  }

  const apartmentId = getSmoobuApartmentId()!;

  const result = await smoobuFetch<AvailabilityResponse>('/booking/checkApartmentAvailability', {
    method: 'POST',
    body: {
      arrivalDate: params.checkInDate,
      departureDate: params.checkOutDate,
      apartments: [apartmentId],
      guests: params.guestCount,
      customerId,
    },
  });

  if (result.availableApartments?.includes(apartmentId)) {
    return { available: true };
  }

  const error = result.errorMessages?.[String(apartmentId)];
  return {
    available: false,
    reason: error?.message || 'Dates not available',
  };
}
