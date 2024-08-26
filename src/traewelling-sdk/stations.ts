import { getTrwlAPI } from './api';
import { Station, type TrwlResponse } from './types';

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
      .json<TrwlResponse<Station>>();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function findStationsByQuery(query: string) {
  const sanitizedQuery = query.replaceAll('/', ' ');

  try {
    const { data } = await (await getTrwlAPI())
      .get(`trains/stations/autocomplete/${sanitizedQuery}`)
      .json<TrwlResponse<Station[]>>();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function getLastStations() {
  try {
    const { data } = await (await getTrwlAPI())
      .get('trains/station/history')
      .json<TrwlResponse<Station[]>>();

    return data;
  } catch (error) {
    console.log(error);
  }
}
