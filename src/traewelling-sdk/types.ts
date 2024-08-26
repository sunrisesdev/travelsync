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
