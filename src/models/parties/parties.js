import { Map } from 'immutable';

export const DEFAULT_PARTY_COUNT = 5;

const parties = [
  {
    id: 'Blue',
    color: '#19CDD7'
  },
  {
    id: 'Brown',
    color: '#DDB27C'
  },
  {
    id: 'Green',
    color: '#4DC19C'
  },
  {
    id: 'Orange',
    color: '#FF991F'
  },
  {
    id: 'Purple',
    color: '#223F9A'
  }
];

export function makeParties(count = DEFAULT_PARTY_COUNT) {
  return Map(
    parties
      .slice(0, count)
      .reduce(
        (acc, party) => ({
          ...acc,
          [party.id]: Map(party)
        }),
        {}
      )
  );
}
