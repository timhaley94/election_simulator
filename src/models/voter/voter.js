import { Map, Set } from 'immutable';
import { makePreferences, getPayoff } from '../preferences/preferences';
import { getRollingStats, getLastStats } from '../history/history';

export const STANDARD_STRATEGY_ID = 'voting-strategy/rational';
export const REACTIONARY_STRATEGY_ID = 'voting-strategy/reactionary';
export const LOYALIST_STRATEGY_ID = 'voting-strategy/loyalist';
export const ESTABLISHMENT_STRATEGY_ID = 'voting-strategy/establishment';
export const ANTI_ESTABLISHMENT_STRATEGY_ID = 'voting-strategy/anti-establishment';
export const RANDOM_STRATEGY_ID = 'voting-strategy/random';

export const strategyIds = Set([
  STANDARD_STRATEGY_ID,
  REACTIONARY_STRATEGY_ID,
  LOYALIST_STRATEGY_ID,
  ESTABLISHMENT_STRATEGY_ID,
  ANTI_ESTABLISHMENT_STRATEGY_ID,
  RANDOM_STRATEGY_ID
]);

function getWeighedPayoff(voter, partyId, winPercentage) {
  const payoff = getPayoff(
    voter.get("preferences"),
    partyId
  );

  return payoff * winPercentage;
}

function rationalStrategy(voter, results) {
  /*
    the math on this "rational" strategy is'
    wrong. This has them voting on weighted
    payoff instead of voting to maximize
    estimated return.
  */
  return (
    results
      .maxBy(
        result => getWeighedPayoff(
          voter,
          result.get("partyId"),
          result.get("winPercentage")
        )
      )
      .get("partyId")
  );
}

function standardStrategy(voter, history, parties) {
  if (history.count() === 0) {
    return loyalistStrategy(voter, history);
  }

  return rationalStrategy(
    voter,
    getRollingStats(history, parties)
  );
}

function reactionaryStrategy(voter, history) {
  if (history.count() === 0) {
    return loyalistStrategy(voter, history);
  }

  return rationalStrategy(
    getLastStats(history)
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
    case REACTIONARY_STRATEGY_ID:
      return reactionaryStrategy;
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
