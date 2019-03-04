import { List, Map, Set } from 'immutable';
import { listOf } from '../../utils';

export const MIN_PARTY_COUNT = 2;
export const DEFAULT_PARTY_COUNT = 5;
export const MAX_PARTY_COUNT = 10;

export function makeParties() {
  let potentialParties = Set([
    {
      id: 'asparagus',
      color: 'rgb(151, 190,17)'
    },
    {
      id: 'corn' ,
      color: 'rgb(255,255,51)'
    },
    {
      id: 'cabbage',
      color: 'rgb(204,255,153)'
    },
    {
      id: 'turnip',
      color: 'rgb(204,0,204)'
    },
    {
      id: 'radish',
      color: 'rgb(255,0,127)'
    },
    {
      id: 'carrot',
      color: 'rgb(255,108,0)'
    },
    {
      id: 'spinach',
      color: 'rgb(40,89,12)'
    },
    {
      id: 'mushroom',
      color: 'rgb(255,204,153)'
    },
    {
      id: 'eggplant',
      color: 'rgb(102,0,102)'
    }
  ]);
  return Map(
    listOf(
      () => {
        const party = potentialParties.maxBy(Math.random);
        potentialParties = potentialParties.remove(party);

        const id = party.id;
        const color = party.color

        const value = Map({ id, color });
        return List([id, value]);
      },
      DEFAULT_PARTY_COUNT
    )
  );
}
