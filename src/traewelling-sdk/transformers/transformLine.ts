import type { HAFASLine } from '../types/hafas';
import type { TSLine, TSLineAppearance } from '../types/types';
import { transformHAFASProductType } from './transformProduct';

const HIDDEN_PRODUCT_NAMES = ['Bus', 'Fäh', 'STB', 'STR'];

const TRWL_LINE_SHAPE_MAPPER: Record<string, TSLineAppearance['shape']> = {
  hexagon: 'hexagon',
  pill: 'pill',
  rectangle: 'rectangle',
  'rectangle-rounded-corner': 'smooth-rectangle',
  trapezoid: 'trapezoid',
};

export function transformHAFASLine(hafasLine: HAFASLine): TSLine {
  return {
    appearance: {
      lineName: hafasLine.name
        .replaceAll(
          new RegExp(`^(${HIDDEN_PRODUCT_NAMES.join('|')})(.)`, 'gi'),
          '$2'
        )
        .trim(),
      productName: hafasLine.productName,
    },
    id: hafasLine.id,
    method: transformHAFASProductType(hafasLine.product),
    name: hafasLine.name,
    operator: {
      id: hafasLine.operator.id,
      name: hafasLine.operator.name,
    },
  };
}

export function transformTrwlLineShape(
  shape: string
): TSLineAppearance['shape'] {
  return TRWL_LINE_SHAPE_MAPPER[shape];
}
