export type HAFASJourney = {
  cylce: {
    max?: number;
    min?: number;
    nr?: number;
  };
  legs: (HAFASJourneyTransportLeg | HAFASJourneyWalkingLeg)[];
  price: {
    amount: number;
    currency: string;
    hint?: unknown | null;
  } | null;
  refreshToken: string;
  type: 'journey';
};

type HAFASJourneyLeg = {
  arrival: string;
  arrivalDelay: number | null;
  departure: string;
  departureDelay: number | null;
  destination: HAFASStation | HAFASStop;
  origin: HAFASStation | HAFASStop;
  plannedArrival: string;
  plannedDeparture: string;
};

type HAFASJourneyTransportLeg = HAFASJourneyLeg & {
  arrivalPlatform: string | null;
  arrivalPrognosisType: string | null;
  cycle?: {
    min?: number;
    max?: number;
    nr?: number;
  };
  departurePlatform: string | null;
  departurePrognosisType: string | null;
  direction: string;
  line: Pick<
    HAFASLine,
    | 'adminCode'
    | 'fahrtNr'
    | 'id'
    | 'mode'
    | 'name'
    | 'product'
    | 'productName'
    | 'public'
    | 'type'
  > &
    Partial<Pick<HAFASLine, 'operator'>>;
  loadFactor?: string;
  plannedArrivalPlatform: string | null;
  plannedDeparturePlatform: string | null;
  reachable: boolean;
  remarks?: {
    code: string;
    summary?: string;
    text: string;
    type: 'hint' | 'status';
  }[];
  stopovers?: HAFASStopover[];
  tripId: string;
};

type HAFASJourneyWalkingLeg = HAFASJourneyLeg & {
  distance: number | null; // Bei `null` sind `origin` und `destination` kann das Leg vermutlich ignoriert werden
  public: boolean;
  walking: boolean;
};

export type HAFASLine = {
  additionalName?: string;
  adminCode: string;
  fahrtNr: string;
  id: string;
  mode: string;
  name: string;
  operator: HAFASOperator;
  product: HAFASProductType;
  productName: string;
  public: boolean;
  type: 'line';
};

export type HAFASLocation = {
  id?: string;
  latitude: number;
  longitude: number;
  type: 'location';
};

export type HAFASOperator = {
  id: string;
  name: string;
  type: 'operator';
};

export type HAFASProductType =
  | 'bus'
  | 'ferry'
  | 'national'
  | 'nationalExpress'
  | 'regional'
  | 'regionalExp'
  | 'suburban'
  | 'subway'
  | 'taxi'
  | 'tram';

export type HAFASStation = {
  id: string;
  location: HAFASLocation;
  name: string;
  products: Record<HAFASProductType, boolean>;
  type: 'station';
};

export type HAFASStatus = {
  code: 'journey-cancelled';
  text: string;
  type: 'status';
};

export type HAFASStop = {
  id: string;
  location: HAFASLocation;
  name: string;
  products: Record<HAFASProductType, boolean>;
  station: HAFASStation;
  type: 'stop';
};

export type HAFASStopover = {
  arrival: string | null;
  arrivalDelay: number | null;
  arrivalPlatform: string | null;
  arrivalPrognosisType: string | null;
  departure: string | null;
  departureDelay: number | null;
  departurePlatform: string | null;
  departurePrognosisType: string | null;
  plannedArrival: string | null;
  plannedArrivalPlatform: string | null;
  plannedDeparture: string | null;
  plannedDeparturePlatform: string | null;
  stop: HAFASStation | HAFASStop;
};

export type HAFASTrip = {
  currentTripPosition: HAFASLocation;
  delay: number;
  destination: HAFASStop;
  direction: string;
  line: HAFASLine;
  loadFactor?: string;
  origin: HAFASStop | null;
  plannedPlatform: string | null;
  plannedWhen: string;
  platform: string | null;
  provenance: any;
  remarks: HAFASStatus[];
  station: {
    ibnr: number;
    id: number;
    latitude: string;
    longitude: string;
    name: string;
    rilIdentifier: string | null;
  };
  stop: HAFASStop;
  tripId: string;
  when: string | null;
};
