import type { TrwlStopover } from '../types/traewelling';
import type { TSStopover } from '../types/types';

export function transformTrwlStopover(trwlStopover: TrwlStopover): TSStopover {
  return {
    arrival: {
      actual: trwlStopover.arrival ?? trwlStopover.arrivalReal ?? undefined,
      planned: trwlStopover.arrivalPlanned ?? undefined,
    },
    departure: {
      actual: trwlStopover.departure ?? trwlStopover.departureReal ?? undefined,
      planned: trwlStopover.departurePlanned ?? undefined,
    },
    platform: {
      actual:
        trwlStopover.platform ??
        trwlStopover.arrivalPlatformReal ??
        trwlStopover.departurePlatformReal ??
        undefined,
      planned:
        trwlStopover.arrivalPlatformPlanned ??
        trwlStopover.departurePlatformPlanned ??
        undefined,
    },
    station: {
      evaId: trwlStopover.evaIdentifier,
      ibnr: undefined,
      latitude: undefined,
      longitude: undefined,
      name: trwlStopover.name,
      rilId: trwlStopover.rilIdentifier ?? undefined,
      trwlId: trwlStopover.id,
    },
    status: trwlStopover.cancelled ? 'cancelled' : 'scheduled',
  };
}
