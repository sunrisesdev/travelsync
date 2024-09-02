import type { HAFASProductType, HAFASTrip } from '../types/hafas';
import type { TrwlTrip } from '../types/traewelling';
import type { TSStation, TSTrip } from '../types/types';
import { transformHAFASLine } from './transformLine';
import { transformHAFASProductType } from './transformProduct';
import { transformHAFASStop, transformTrwlStation } from './transformStation';
import { transformTrwlStopover } from './transformStopover';

export function transformHAFASTrip(hafasTrip: HAFASTrip): TSTrip {
  return {
    departure: {
      actual: hafasTrip.when ?? undefined,
      planned: hafasTrip.plannedWhen ?? undefined,
    },
    departureStation: {
      evaId: hafasTrip.station.id,
      ibnr: hafasTrip.station.ibnr,
      latitude: +hafasTrip.station.latitude,
      longitude: +hafasTrip.station.longitude,
      name: hafasTrip.station.name,
      rilId: hafasTrip.station.rilIdentifier ?? undefined,
      servesMethod: Object.entries(hafasTrip.stop.products).reduce(
        (transformed, [product, value]) => ({
          ...transformed,
          [transformHAFASProductType(product as HAFASProductType)]: value,
        }),
        {}
      ) as TSStation['servesMethod'],
      trwlId: undefined,
    },
    designation: hafasTrip.direction,
    destination: transformHAFASStop(hafasTrip.destination),
    hafasId: hafasTrip.tripId,
    line: transformHAFASLine(hafasTrip.line),
    origin: !hafasTrip.origin
      ? undefined
      : transformHAFASStop(hafasTrip.origin),
    platform: {
      actual: hafasTrip.platform ?? undefined,
      planned: hafasTrip.plannedPlatform ?? undefined,
    },
    runningNumber:
      !hafasTrip.line.fahrtNr || hafasTrip.line.fahrtNr === '0'
        ? undefined
        : hafasTrip.line.fahrtNr,
    stopovers: undefined,
    trwlId: undefined,
  };
}

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
