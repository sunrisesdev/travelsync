import { getTrwlAPI } from './api';
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
    const { data: departures, meta } = await (
      await getTrwlAPI()
    )
      .get(`station/${trwlStationId}/departures`, {
        searchParams,
      })
      .json<DeparturesResponse>();

    return { trips: departures, meta };
  } catch (error) {
    console.log(error);
  }
}

export async function getTrip(
  hafasTripId: string,
  lineName: string,
  originStationEvaId: string
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

    return data;
  } catch (error) {
    console.log(error);
  }
}
