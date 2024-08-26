import type { HAFASProductType } from './hafas';

export type TrwlAPIResponse<T> = {
  data: T;
};

export type TrwlClient = {
  id: number;
  name: string;
  privacyPolicyUrl: string;
};

export type TrwlLightUser = {
  displayName: string;
  id: number;
  mastodonUrl: string | null;
  preventIndex: boolean;
  profilePicture: string;
  username: string;
};

export type TrwlLineColorDefinition = {
  backgroundColor: string;
  borderColor: string;
  hafasLineId: string;
  hafasOperatorCode: string;
  lineName: string;
  shape: string;
  shortOperatorName: string;
  textColor: string;
};

export type TrwlMention = {
  length: number;
  position: number;
  user: TrwlUser;
};

export type TrwlOperator = {
  id: number;
  identifier: string;
  name: string;
};

export type TrwlStation = {
  ibnr: number;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  rilIdentifier: string | null;
};

export type TrwlStatus = {
  body: string;
  bodyMentions: TrwlMention[];
  business: number; // 0=private, 1=business, 2=commute
  client: TrwlClient;
  createdAt: string;
  event: any; // TODO: add type
  id: string;
  isLikable: boolean;
  liked: boolean;
  likes: number;
  tags: TrwlStatusTag[];
  train: TrwlTrain;
  userDetails: TrwlLightUser;
  visibility: number; // 0=public, 1=unlisted, 2=followers, 3=private, 4=authenticated
};

export type TrwlStatusTag = {
  key: string;
  value: string;
  visibility: number; // 0=public, 1=unlisted, 2=followers, 3=private, 4=authenticated
};

export type TrwlStopover = {
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

export type TrwlTrain = {
  category: HAFASProductType;
  destination: TrwlStopover;
  distance: number;
  duration: number;
  hafasId: string;
  journeyNumber?: number;
  lineName: string;
  manualArrival: string | null;
  manualDeparture: string | null;
  number: string; // = Line ID
  operator: TrwlOperator | null;
  origin: TrwlStopover;
  points: number;
  trip: number;
};

export type TrwlTravelType =
  | 'bus'
  | 'express'
  | 'ferry'
  | 'plane'
  | 'regional'
  | 'suburban'
  | 'subway'
  | 'taxi'
  | 'tram';

export type TrwlTrip = {
  category: HAFASProductType;
  destination: TrwlStation;
  id: number;
  journeyNumber: number | null; // Zugnummer
  lineName: string;
  number: string; // HAFAS Line-ID
  origin: TrwlStation;
  stopovers: TrwlStopover[];
};

export type TrwlUser = {
  displayName: string;
  following: boolean;
  followPending: boolean;
  id: number;
  likes_enabled: boolean;
  mastodonUrl: string | null;
  muted: boolean;
  points: number;
  preventIndex: boolean;
  privateProfile: boolean;
  profilePicture: string;
  trainDistance: number;
  trainDuration: number;
  userInvisibleToMe: boolean;
  username: string;
};
