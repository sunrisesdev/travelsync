import type { TrwlStation } from '../types/traewelling';
import type { TSStation } from '../types/types';

export function transformTrwlStation(trwlStation: TrwlStation): TSStation {
  return {
    evaId: undefined,
    ibnr: trwlStation.ibnr,
    latitude: trwlStation.latitude,
    longitude: trwlStation.longitude,
    name: trwlStation.name,
    rilId: trwlStation.rilIdentifier ?? undefined,
    servesMethod: undefined,
    trwlId: trwlStation.id,
  };
}
