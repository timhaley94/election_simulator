import { List, Map, Set } from 'immutable';
import { listOf } from '../../utils';

export const MIN_PARTY_COUNT = 2;
export const DEFAULT_PARTY_COUNT = 5;
export const MAX_PARTY_COUNT = 10;

export function makeParties() {
  let names = Set([
    'asparagus',
    'corn',
    'cabbage',
    'turnip',
    'radish',
    'carrot',
    'onion',
    'spinach',
    'mushroom',
    'eggplant'
  ]);

  let colors = Set([
    'rgb(18, 147, 154)',
    'rgb(121, 199, 227)',
    'rgb(26, 49, 119)',
    'rgb(255, 152, 51)',
    'rgb(239, 93, 40)'
  ]);

  return Map(
    listOf(
      () => {
        const id = names.maxBy(Math.random);
        names = names.remove(id);

        const color = colors.maxBy(Math.random);
        colors = colors.remove(color);

        const value = Map({ id, color });
        return List([id, value]);
      },
      DEFAULT_PARTY_COUNT
    )
  );
}
