import { listOf, randomFloat } from './utils';

export function makePreferences(parties) {
  const payoffs = listOf(
    () => randomFloat(-1, 1),
    parties.count()
  );

  return Map(
    parties
      .map(party => party.get("id"))
      .zip(payoffs)
      .mapEntries(
        (k, v) => [
          k,
          Map({
            partyId: k,
            payoff: v
          })
        ]
      )
  );
}

export function getPayoff(preferences, partyId) {
  return preferences.get(partyId).get("payoff");
}
