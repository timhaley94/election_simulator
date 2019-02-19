import { List, Map, Set } from 'immutable';
import { listOf } from '../../utils';

export const MIN_PARTY_COUNT = 2;
export const DEFAULT_PARTY_COUNT = 5;
export const MAX_PARTY_COUNT = 10;

export function makeParties(length = DEFAULT_PARTY_COUNT) {
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

  return Map(
    listOf(
      () => {
        const id = names.maxBy(Math.random);
        names = names.remove(id);

        const value = Map({ id });
        return List([id, value]);
      },
      length
    )
  );
}
