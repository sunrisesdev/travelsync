import { hafasAPI } from './api';
import type { HAFASLocationsResponse } from './types';

export async function findStationsByQuery(
  query: string,
  options?: { includeLines?: boolean }
) {
  const response = await hafasAPI
    .get('locations', {
      searchParams: {
        addresses: false,
        language: 'de',
        linesOfStops: options?.includeLines ?? false,
        poi: false,
        pretty: false,
        query: encodeURIComponent(query),
      },
    })
    .json<HAFASLocationsResponse>();

  return response;
}

export async function getStationByName(
  name: string,
  options?: { includeLines: boolean }
) {
  const response = await hafasAPI
    .get('locations', {
      searchParams: {
        addresses: false,
        fuzzy: false,
        language: 'de',
        linesOfStops: options?.includeLines ?? false,
        poi: false,
        pretty: false,
        results: 1,
        query: encodeURIComponent(name),
      },
    })
    .json<HAFASLocationsResponse>();

  return response.at(0);
}
