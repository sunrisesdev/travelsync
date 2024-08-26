import type {
  TrwlClient,
  TrwlLightUser,
  TrwlMention,
  TrwlStatusTag,
} from './traewelling';

type Fluctuating<T> = {
  actual: T;
  planned: T;
};

export type TSLine = {
  appearance: TSLineAppearance;
  id: string;
  method: TSMethod;
  name: string;
  operator: TSOperator;
};

export type TSLineAppearance = {
  accentColor?: string;
  background?: string;
  border?: string;
  color?: string;
  contrastColor?: string;
  lineName: string;
  productName: string;
  shape?:
    | 'circle'
    | 'hexagon'
    | 'pill'
    | 'rectangle'
    | 'regular-hexagon'
    | 'smooth-rectangle'
    | 'smooth-square'
    | 'square'
    | 'trapezoid';
};

export type TSMethod =
  | 'bus'
  | 'ferry'
  | 'national-express'
  | 'national'
  | 'regional-express'
  | 'regional'
  | 'suburban'
  | 'subway'
  | 'taxi'
  | 'tram';

export type TSOperator = {
  id: string;
  name: string;
};

export type TSStation = {
  evaId?: number; // = hafasId, station.id
  ibnr?: number;
  latitude?: number;
  longitude?: number;
  name: string; // TODO: use db-clean-station-name in frontend maybe?
  rilId?: string;
  servesMethod?: Record<TSMethod, boolean>;
  trwlId?: number; // = stop.id
};

export type TSStatus = {
  client?: TrwlClient; // TODO: add type
  createdAt: string;
  event: unknown; // TODO: add type
  id: string;
  isLikeable: boolean;
  likeCount: number;
  likedByMe?: boolean;
  mentions: TrwlMention[]; // TODO: add type
  message: string;
  route: {
    destination: TSStopover;
    distance: number;
    duration: number;
    hafasTripId: string;
    line: TSLine;
    manualArrival?: string;
    manualDeparture?: string;
    origin: TSStopover;
    pointsAwarded: number;
    runningNumber?: string;
    trwlTripId: number;
  };
  tags: TrwlStatusTag[];
  travelReason: TSTravelReason;
  userDetails: TrwlLightUser; // TODO: add type
  visibility: TSVisibility;
};

export type TSStopover = {
  arrival: Fluctuating<string | undefined>;
  departure: Fluctuating<string | undefined>;
  platform: Fluctuating<string | undefined>;
  station: TSStation;
  status: 'additional' | 'cancelled' | 'scheduled';
};

export type TSTravelReason = 'business' | 'commute' | 'private';

export type TSTrip = {
  departure?: Fluctuating<string | undefined>;
  departureStation?: TSStation;
  designation: string; // = this is the line destination string
  destination: TSStation;
  hafasId?: string;
  line: TSLine;
  origin?: TSStation;
  platform?: Fluctuating<string | undefined>;
  runningNumber?: string;
  stopovers?: TSStopover[];
  trwlId?: number;
};

export type TSVisibility =
  | 'only-authenticated'
  | 'only-followers'
  | 'private'
  | 'public'
  | 'unlisted';
