import type { TSLineAppearance } from '../types/types';

const TRWL_LINE_SHAPE_MAPPER: Record<string, TSLineAppearance['shape']> = {
  hexagon: 'hexagon',
  pill: 'pill',
  rectangle: 'rectangle',
  'rectangle-rounded-corner': 'smooth-rectangle',
  trapezoid: 'trapezoid',
};
