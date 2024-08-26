import type { HAFASProductType } from './hafasTypes';

export type TrwlResponse<T> = {
  data: T;
};

export type Station = {
  ibnr: number;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  rilIdentifier?: string;
};

export type Stop = {
  arrival: string | null;
  arrivalPlanned: string | null;
  arrivalPlatformPlanned: string | null;
  arrivalPlatformReal: string | null;
  arrivalReal: string | null;
  cancelled: boolean;
  departure: string | null;
  departurePlanned: string | null;
  departurePlatformPlanned: string | null;
  departurePlatformReal: string | null;
  departureReal: string | null;
  evaIdentifier: number;
  id: number;
  isArrivalDelayed: boolean;
  isDepartureDelayed: boolean;
  name: string;
  platform: string | null;
  rilIdentifier: string | null;
};

export type TransportationType =
  | 'bus'
  | 'express'
  | 'ferry'
  | 'plane'
  | 'regional'
  | 'suburban'
  | 'subway'
  | 'taxi'
  | 'tram';

export type Trip = {
  category: HAFASProductType;
  destination: Station;
  id: number;
  journeyNumber: number | null; // Zugnummer
  lineName: string;
  number: string; // HAFAS Line-ID
  origin: Station;
  stopovers: Stop[];
};
