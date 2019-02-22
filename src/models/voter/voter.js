import { Map, Set } from 'immutable';
import { makePreferences } from '../preferences/preferences';
import { getRollingStats, getLastStats } from '../history/history';

export const STANDARD_STRATEGY_ID = 'voting-strategy/rational';
export const LOYALIST_STRATEGY_ID = 'voting-strategy/loyalist';
export const ESTABLISHMENT_STRATEGY_ID = 'voting-strategy/establishment';
export const ANTI_ESTABLISHMENT_STRATEGY_ID = 'voting-strategy/anti-establishment';
export const RANDOM_STRATEGY_ID = 'voting-strategy/random';

export const strategyIds = Set([
  STANDARD_STRATEGY_ID,
  LOYALIST_STRATEGY_ID,
  ESTABLISHMENT_STRATEGY_ID,
  ANTI_ESTABLISHMENT_STRATEGY_ID,
  RANDOM_STRATEGY_ID
]);

function standardStrategy(voter, history, parties) {
  if (history.count() === 0) {
    return loyalistStrategy(voter, history);
  }

  /*
    HEYYYYY

    here's what you need to do:
    instead of bestChance do secondBestChance
    and make the cut off based on that. This
    handles the scenario where only one party
    is likely to win.
  */

  const stats = getRollingStats(history, parties)

  const secondBestChance = (
    stats
      .toList()
      .sortBy(stat => stat.get('winPercentage'))
      .get(1)
      .get('winPercentage')
  );

  const cuttoff = secondBestChance - 0.8;
  const competitiveParties = (
    stats
      .filter(stat => stat.get('winPercentage') >= cuttoff)
      .mapEntries(
        ([partyId, stat]) => [
          partyId,
          stat.set(
            'payoff',
            voter
              .get('preferences')
              .get(partyId)
              .get('payoff')
          )
        ]
      )
  );

  if (competitiveParties.count() <= 1) {
    return loyalistStrategy(voter, history);
  }

  const worstPayoff = (
    competitiveParties
      .minBy(party => party.get('payoff'))
      .get('payoff')
  );

  return (
    competitiveParties
      .map(party => party.update('payoff', p => p - worstPayoff))
      .maxBy(party => party.get('payoff') * party.get('winPercentage'))
      .get('partyId')
  );
}

function loyalistStrategy(voter) {
  return (
    voter
      .get("preferences")
      .maxBy(preference => preference.get("payoff"))
      .get("partyId")
  );
}

function establishmentStrategy(voter, history) {
  if (history.count() === 0) {
    return loyalistStrategy(voter, history);
  }

  return (
    getLastStats(history)
      .maxBy(result => result.get('winPercentage'))
      .get("partyId")
  );
}

function antiEstablishmentStrategy(voter, history) {
  if (history.count() === 0) {
    return loyalistStrategy(voter, history);
  }

  return (
    getLastStats(history)
      .sortBy(result => result.get('winPercentage'))
      .reverse()
      .toList()
      .get(1)
      .get("partyId")
  );
}

function randomStrategy(voter) {
  return (
    voter
      .get("preferences")
      .maxBy(Math.random)
      .get("partyId")
  );
}

function getStrategy(id) {
  switch (id) {
    case STANDARD_STRATEGY_ID:
      return standardStrategy;
    case LOYALIST_STRATEGY_ID:
      return loyalistStrategy;
    case ESTABLISHMENT_STRATEGY_ID:
      return establishmentStrategy;
    case ANTI_ESTABLISHMENT_STRATEGY_ID:
      return antiEstablishmentStrategy;
    case RANDOM_STRATEGY_ID:
      return randomStrategy;
    default:
      throw Error("Switch Error. No matching case for voter strategy.");
  }
}

export function makeVoter(parties, strategyId = RANDOM_STRATEGY_ID) {
  return Map({
    strategyId: strategyId,
    preferences: makePreferences(parties)
  });
}

export function selectVote(voter, parties, history) {
  return getStrategy(voter.get("strategyId"))(voter, history, parties);
}
