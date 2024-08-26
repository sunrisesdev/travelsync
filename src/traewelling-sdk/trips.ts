import { getTrwlAPI } from './api';
import type { HAFASTrip } from './hafasTypes';
import type { Station, TransportationType, Trip, TrwlResponse } from './types';

type DeparturesResponse = TrwlResponse<HAFASTrip[]> & {
  meta: {
    station: Station;
    times: {
      next: string;
      now: string;
      prev: string;
    };
  };
};

export async function getDeparturesFromStation(
  trwlStationId: string,
  options?: { departureAt?: Date; transportationType?: TransportationType }
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
      .json<TrwlResponse<Trip>>();

    return data;
  } catch (error) {
    console.log(error);
  }
}
