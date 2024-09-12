import type {
  HAFASJourney,
  HAFASLine,
  HAFASStation,
  HAFASStop,
} from '@/traewelling-sdk/types/hafas';

export type HAFASLocationsResponse = ((HAFASStation | HAFASStop) & {
  lines?: Pick<
    HAFASLine,
    'fahrtNr' | 'id' | 'mode' | 'name' | 'product' | 'public' | 'type'
  >[];
})[];

export type HAFASJourneysResponse = {
  earlierRef: string;
  journeys: HAFASJourney[];
  laterRef: string;
  realtimeDataUpdatedAt: number;
};
