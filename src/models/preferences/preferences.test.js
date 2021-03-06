import { Set } from 'immutable';
import { makeParties } from '../parties/parties';
import { makePreferences } from './preferences';

describe('makePreferences', () => {
  const parties = makeParties();
  const preferences = makePreferences(parties);

  it('creates preference for each party', () => {
    expect(
      Set.fromKeys(parties).equals(
        Set.fromKeys(preferences)
      )
    ).toBe(true);
  });

  it('returns values that include partyId', () => {
    preferences.forEach(
      val => {
        expect(
          val.has('partyId')
        ).toBe(true);

        expect(
          Set.fromKeys(parties).includes(
            val.get('partyId')
          )
        ).toBe(true);
      }
    );
  });

  it('returns values that include valid payoff', () => {
    preferences.forEach(
      val => {
        expect(
          val.has('payoff')
        ).toBe(true);

        const payoff = val.get('payoff');

        expect(payoff >= -1).toBe(true);
        expect(payoff <= 1).toBe(true);
      }
    );
  });
});
