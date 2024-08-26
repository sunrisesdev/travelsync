import { getTrwlAPI } from './api';
import type { HAFASTrip } from './hafasTypes';
import type { Station, TransportationType, TrwlResponse } from './types';

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

export async function getTripsFromStation(
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
    const { data: trips, meta } = await (
      await getTrwlAPI()
    )
      .get(`station/${trwlStationId}/departures`, {
        searchParams,
      })
      .json<DeparturesResponse>();

    return { trips, meta };
  } catch (error) {
    console.log(error);
  }
}
