import { Set } from 'immutable';
import { DEFAULT_PARTY_COUNT, makeParties } from './parties';

it('respects the DEFAULT_PARTY_COUNT variable', () => {
  expect(
    makeParties().count()
  ).toBe(
    DEFAULT_PARTY_COUNT
  );
});

it('respects the length argument', () => {
  expect(
    makeParties(11).count()
  ).toBe(
    11
  );
});

it('creates unique ids', () => {
  const parties = makeParties();
  let ids = Set();

  parties.forEach(
    party => {
      expect(party.has("id")).toBe(true);

      const id = party.get("id");

      expect(ids.includes(id)).toBe(false);
      ids = ids.add(id);
    }
  )
});
