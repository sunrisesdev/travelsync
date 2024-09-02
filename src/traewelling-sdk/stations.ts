import { getTrwlAPI } from './api';
import { transformTrwlStation } from './transformers/transformStation';
import type { TrwlAPIResponse, TrwlStation } from './types/traewelling';

export async function findStationByLocation(
  latitude: number,
  longitude: number
) {
  try {
    const { data } = await (
      await getTrwlAPI()
    )
      .get('trains/stations/nearby', {
        searchParams: {
          latitude,
          longitude,
        },
      })
      .json<TrwlAPIResponse<TrwlStation>>();

    return transformTrwlStation(data);
  } catch (error) {
    console.error(error);
  }
}

export async function findStationsByQuery(query: string) {
  const sanitizedQuery = query.replaceAll('/', ' ');

  try {
    const { data } = await (await getTrwlAPI())
      .get(`trains/stations/autocomplete/${sanitizedQuery}`)
      .json<TrwlAPIResponse<TrwlStation[]>>();

    return data.map(transformTrwlStation);
  } catch (error) {
    console.error(error);
  }
}

export async function getLastStations() {
  try {
    const { data } = await (await getTrwlAPI())
      .get('trains/station/history')
      .json<TrwlAPIResponse<TrwlStation[]>>();

    return data.map(transformTrwlStation);
  } catch (error) {
    console.error(error);
  }
}
