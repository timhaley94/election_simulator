import { Map } from 'immutable';
import { listOf, randomFloat } from '../utils';

export function makePreferences(parties) {
  const payoffs = listOf(
    () => randomFloat(-1, 1),
    parties.count()
  );

  return (
    parties.mapEntries(
      ([partyId, ...rest], i) => [
        partyId,
        Map({
          partyId,
          payoff: payoffs.get(i)
        })
      ]
    )
  );
}

export function getPayoff(preferences, partyId) {
  return preferences.get(partyId).get("payoff");
}
