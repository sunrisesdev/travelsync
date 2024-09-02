import type { HAFASProductType, HAFASStop } from '../types/hafas';
import type { TrwlStation } from '../types/traewelling';
import type { TSStation } from '../types/types';
import { transformHAFASProductType } from './transformProduct';

export function transformHAFASStop(hafasStop: HAFASStop): TSStation {
  return {
    evaId: undefined,
    ibnr: +hafasStop.id,
    latitude: hafasStop.location.latitude,
    longitude: hafasStop.location.longitude,
    name: hafasStop.name,
    rilId: undefined,
    servesMethod: Object.entries(hafasStop.products).reduce(
      (transformed, [product, value]) => ({
        ...transformed,
        [transformHAFASProductType(product as HAFASProductType)]: value,
      }),
      {}
    ) as TSStation['servesMethod'],
    trwlId: undefined,
  };
}

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
