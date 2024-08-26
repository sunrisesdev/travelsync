import type { HAFASProductType } from '../types/hafas';
import type { TSMethod } from '../types/types';

const HAFAS_PRODUCT_MAPPER: Record<HAFASProductType, TSMethod> = {
  bus: 'bus',
  ferry: 'ferry',
  national: 'national',
  nationalExpress: 'national-express',
  regional: 'regional',
  regionalExp: 'regional-express',
  suburban: 'suburban',
  subway: 'subway',
  taxi: 'taxi',
  tram: 'tram',
};

export function transformHAFASProductType(hafasProductType: HAFASProductType) {
  return HAFAS_PRODUCT_MAPPER[hafasProductType];
}
