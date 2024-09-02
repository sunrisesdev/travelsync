import { createLineAppearanceDataset } from '@/parcels/line-apperance/createLineApperanceDataset';
import { getTrwlAPI } from './api';
import { transformTrwlStation } from './transformers/transformStation';
import {
  transformHAFASTrip,
  transformTrwlTrip,
} from './transformers/transformTrip';
import type { HAFASTrip } from './types/hafas';
import type {
  TrwlAPIResponse,
  TrwlStation,
  TrwlTravelType,
  TrwlTrip,
} from './types/traewelling';

type DeparturesResponse = TrwlAPIResponse<HAFASTrip[]> & {
  meta: {
    station: TrwlStation;
    times: {
      next: string;
      now: string;
      prev: string;
    };
  };
};

export async function getDeparturesFromStation(
  trwlStationId: string,
  options?: { departureAt?: Date; transportationType?: TrwlTravelType }
) {
  const searchParams = new URLSearchParams();

  if (!!options?.departureAt) {
    searchParams.set('when', options.departureAt.toISOString());
  }

  if (!!options?.transportationType) {
    searchParams.set('travelType', options.transportationType);
  }

  try {
    const {
      data: departures,
      meta: { station, times },
    } = await (
      await getTrwlAPI()
    )
      .get(`station/${trwlStationId}/departures`, {
        searchParams,
      })
      .json<DeparturesResponse>();

    const transformed = {
      meta: { station: transformTrwlStation(station), times },
      trips: departures.map(transformHAFASTrip),
    };

    const { getAppearanceForLine } = await createLineAppearanceDataset();

    transformed.trips.forEach((trip) => {
      trip.line.appearance = getAppearanceForLine(trip.line);
    });

    return transformed;
  } catch (error) {
    console.error(error);
  }
}

export async function getTrip(
  hafasTripId: string,
  lineName: string,
  originStationEvaId: string,
  operatorId: string = ''
) {
  try {
    const { data } = await (
      await getTrwlAPI()
    )
      .get(`trains/trip`, {
        searchParams: {
          hafasTripId,
          lineName,
          start: originStationEvaId,
        },
      })
      .json<TrwlAPIResponse<TrwlTrip>>();

    const transformed = transformTrwlTrip(data);

    const { getAppearanceForLine } = await createLineAppearanceDataset();

    transformed.line.operator.id = operatorId;
    transformed.line.appearance = getAppearanceForLine(transformed.line);

    return transformed;
  } catch (error) {
    console.error(error);
  }
}
