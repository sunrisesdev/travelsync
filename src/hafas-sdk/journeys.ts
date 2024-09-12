import { hafasAPI } from './api';
import type { HAFASJourneysResponse } from './types';

export async function findJourneys(
  fromIBNR: number,
  toIBNR: number,
  options?: { includeStopovers?: boolean }
) {
  const response = await hafasAPI
    .get('journeys', {
      searchParams: {
        from: fromIBNR,
        language: 'de',
        pretty: false,
        stopovers: options?.includeStopovers ?? false,
        to: toIBNR,
      },
    })
    .json<HAFASJourneysResponse>();

  return response;
}
