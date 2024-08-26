import type { TrwlTrip } from '../types/traewelling';
import type { TSTrip } from '../types/types';
import { transformHAFASProductType } from './transformProduct';
import { transformTrwlStation } from './transformStation';
import { transformTrwlStopover } from './transformStopover';

export function transformTrwlTrip(trwlTrip: TrwlTrip): TSTrip {
  return {
    departure: undefined,
    departureStation: undefined,
    designation: trwlTrip.stopovers.at(-1)?.name ?? '',
    destination: transformTrwlStation(trwlTrip.destination),
    hafasId: undefined,
    line: {
      appearance: {
        lineName: trwlTrip.lineName,
        productName: '',
      },
      id: trwlTrip.number,
      method: transformHAFASProductType(trwlTrip.category),
      name: trwlTrip.lineName,
      operator: {
        id: '',
        name: '',
      },
    },
    origin: transformTrwlStation(trwlTrip.origin),
    platform: undefined,
    runningNumber: trwlTrip.journeyNumber?.toString(),
    stopovers: trwlTrip.stopovers.map(transformTrwlStopover),
    trwlId: trwlTrip.id,
  };
}
