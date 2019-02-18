import { List, Map } from 'immutable';
import uuid from 'uuid/v4';
import { listOf } from '../utils';

export const DEFAULT_PARTY_COUNT = 5;

export function makeParties(length = DEFAULT_PARTY_COUNT) {
  return Map(
    listOf(
      () => {
        const id = uuid();
        const value = Map({ id });

        return List([id, value]);
      },
      length
    )
  );
}
