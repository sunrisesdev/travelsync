import { auth } from '@/auth';
import { trwlAPI } from './api';
import { Station, type TrwlResponse } from './types';

export async function findStationByLocation(
  latitude: number,
  longitude: number
) {
  try {
    const { data } = await trwlAPI
      .get('trains/stations/nearby', {
        searchParams: {
          latitude,
          longitude,
        },
      })
      .json<TrwlResponse<Station>>();

    return data;
  } catch {}
}

export async function findStationsByQuery(query: string) {
  const sanitizedQuery = query.replaceAll('/', ' ');

  try {
    const { data } = await trwlAPI
      .get(`trains/stations/autocomplete/${sanitizedQuery}`)
      .json<TrwlResponse<Station[]>>();

    return data;
  } catch {}
}

export async function getLastStations() {
  const session = await auth();

  try {
    const { data } = await trwlAPI
      .get('trains/station/history', {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      })
      .json<TrwlResponse<Station[]>>();

    return data;
  } catch (error) {
    console.log(error);
  }
}
