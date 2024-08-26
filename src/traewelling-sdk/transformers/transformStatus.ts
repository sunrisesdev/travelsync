import type { TrwlStatus } from '../types/traewelling';
import type { TSStatus, TSTravelReason, TSVisibility } from '../types/types';
import { transformHAFASProductType } from './transformProduct';
import { transformTrwlStopover } from './transformStopover';

const HIDDEN_PRODUCT_NAMES = ['Bus', 'Fäh', 'STB', 'STR'];

const TRWL_BUSINESS_MAPPER: TSTravelReason[] = [
  'private',
  'business',
  'commute',
];

const TRWL_VISIBILITY_MAPPER: TSVisibility[] = [
  'public',
  'unlisted',
  'only-followers',
  'private',
  'only-authenticated',
];

export function transformTrwlStatus(trwlStatus: TrwlStatus): TSStatus {
  return {
    createdAt: trwlStatus.createdAt,
    event: trwlStatus.event,
    id: trwlStatus.id,
    isLikeable: trwlStatus.isLikable,
    likeCount: trwlStatus.likes,
    likedByMe: trwlStatus.liked,
    mentions: trwlStatus.bodyMentions,
    message: trwlStatus.body,
    route: {
      destination: transformTrwlStopover(trwlStatus.train.destination),
      distance: trwlStatus.train.distance,
      duration: trwlStatus.train.duration,
      hafasTripId: trwlStatus.train.hafasId,
      line: {
        appearance: {
          lineName: trwlStatus.train.lineName
            .replaceAll(
              new RegExp(`^(${HIDDEN_PRODUCT_NAMES.join('|')})(.)`, 'gi'),
              '$2'
            )
            .trim(),
          productName: '',
        },
        id: trwlStatus.train.number,
        method: transformHAFASProductType(trwlStatus.train.category),
        name: trwlStatus.train.lineName,
        operator: {
          id: trwlStatus.train.operator?.identifier ?? '',
          name: trwlStatus.train.operator?.name ?? '',
        },
      },
      manualArrival: trwlStatus.train.manualArrival ?? undefined,
      manualDeparture: trwlStatus.train.manualDeparture ?? undefined,
      origin: transformTrwlStopover(trwlStatus.train.origin),
      pointsAwarded: trwlStatus.train.points,
      trwlTripId: trwlStatus.train.trip,
      runningNumber: trwlStatus.train.journeyNumber?.toString() ?? '',
    },
    tags: trwlStatus.tags,
    travelReason: TRWL_BUSINESS_MAPPER[trwlStatus.business],
    userDetails: trwlStatus.userDetails,
    visibility: TRWL_VISIBILITY_MAPPER[trwlStatus.visibility],
  };
}
