import { Map } from 'immutable';
import uuid from 'uuid/v4';
import { listOf } from './utils';

const DEFAULT_PARTY_COUNT = 5;

export function makeParties(length = DEFAULT_PARTY_COUNT) {
  return listOf(
    () => Map({
      id: uuid()
    }),
    length
  );
}
