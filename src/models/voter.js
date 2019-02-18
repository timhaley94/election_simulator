import { makePreferences, getPayoff } from './preferences';
import { getAllResults, getLastResults } from './history';

const STANDARD_STRATEGY_ID = 'voting-strategy/rational';
const REACTIONARY_STRATEGY_ID = 'voting-strategy/reactionary';
const LOYALIST_STRATEGY_ID = 'voting-strategy/loyalist';
const ESTABLISHMENT_STRATEGY_ID = 'voting-strategy/establishment';
const ANTI_ESTABLISHMENT_ID = 'voting-strategy/anti-establishment';
const RANDOM_STRATEGY_ID = 'voting-strategy/random';

function getWeighedPayoff(voter, partyId, winPercentage) {
  const payoff = getPayoff(
    voter.get("preferences"),
    partyId
  );

  return payoff * winPercentage;
}

function rationalStrategy(voter, results) {
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

function standardStrategy(voter, history) {
  return rationalStrategy(
    getAllResults(history)
  );
}

function reactionaryStrategy(voter, history) {
  return rationalStrategy(
    getLastResults(history)
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
  return (
    getLastResults(history)
      .maxBy(result => result.get("winPercentage"))
      .get("partyId")
  );
}

function antiEstablishmentStrategy(voter, history) {
  return (
    getLastResults(history)
      .sortBy(result => result.get("winPercentage"))
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
    case ANTI_ESTABLISHMENT_ID:
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

export function selectVote(voter, history) {
  return getStrategy(voter.get("strategyId"))(voter, history);
}
