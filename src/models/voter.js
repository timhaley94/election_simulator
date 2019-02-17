import { makePreferences, getPayoff } from './preferences';

const RATIONAL_STRATEGY_ID = 'voting-strategy/rational';
const RANDOM_STRATEGY_ID = 'voting-strategy/random';
const LOYALIST_STRATEGY_ID = 'voting-strategy/loyalist';
const REACTIONARY_STRATEGY_ID = 'voting-strategy/reactionary';
const ESTABLISHMENT_STRATEGY_ID = 'voting-strategy/establishment';
const ANTI_ESTABLISHMENT_ID = 'voting-strategy/anti-establishment';

function getWeighedPayoff(voter, partyId, winPercentage) {
  const payoff = getPayoff(
    voter.get("preferences"),
    partyId
  );

  return payoff * winPercentage;
}

function rationalStrategy(voter, lastResults, allResults) {
  return (
    allResults
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

function randomStrategy(voter) {
  return (
    voter
      .get("preferences")
      .maxBy(Math.random)
      .get("partyId")
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

function reactionaryStrategy(voter, lastResults) {
  return rationalStrategy(voter, null, lastResults);
}

function establishmentStrategy(voter, lastResults) {
  return (
    lastResults
      .maxBy(result => result.get("winPercentage"))
      .get("partyId")
  );
}

function antiEstablishmentStrategy(voter, lastResults) {
  return (
    lastResults
      .sortBy(result => result.get("winPercentage"))
      .get(1)
      .get("partyId")
  );
}

function getStrategy(id) {
  switch (id) {
    case RATIONAL_STRATEGY_ID:
      return rationalStrategy;
    case RANDOM_STRATEGY_ID:
      return randomStrategy;
    case LOYALIST_STRATEGY_ID:
      return loyalistStrategy;
    case REACTIONARY_STRATEGY_ID:
      return reactionaryStrategy;
    case ESTABLISHMENT_STRATEGY_ID:
      return establishmentStrategy;
    case ANTI_ESTABLISHMENT_ID:
      return antiEstablishmentStrategy;
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

export function selectVote(voter, lastResults, allResults) {
  return getStrategy(voter.get("strategyId"))(
    voter,
    lastResults,
    allResults
  );
}
