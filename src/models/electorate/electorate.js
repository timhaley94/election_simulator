import { List, Map, Repeat } from 'immutable';
import { listOf } from '../../utils';
import { makeParties } from '../parties/parties';
import {
  makeVoter,
  selectVote,
  STANDARD_STRATEGY_ID,
  LOYALIST_STRATEGY_ID,
  ESTABLISHMENT_STRATEGY_ID,
  ANTI_ESTABLISHMENT_STRATEGY_ID,
  RANDOM_STRATEGY_ID
} from '../voter/voter';
import { makeHistory, extendHistory } from '../history/history';

const DEFAULT_VOTER_TYPE_DISTRIBUTION = {
  standard: 75,
  loyalist: 5,
  establishment: 5,
  antiEstablishment: 10,
  random: 5
};

export function makeElectorate({ voterTypeDistribution }) {
  const {
    standard,
    loyalist,
    establishment,
    antiEstablishment,
    random
  } = voterTypeDistribution || DEFAULT_VOTER_TYPE_DISTRIBUTION;

  const parties = makeParties();
  const voters = (
    List([
      listOf(
        () => makeVoter(parties, STANDARD_STRATEGY_ID),
        standard
      ),
      listOf(
        () => makeVoter(parties, LOYALIST_STRATEGY_ID),
        loyalist
      ),
      listOf(
        () => makeVoter(parties, ESTABLISHMENT_STRATEGY_ID),
        establishment
      ),
      listOf(
        () => makeVoter(parties, ANTI_ESTABLISHMENT_STRATEGY_ID),
        antiEstablishment
      ),
      listOf(
        () => makeVoter(parties, RANDOM_STRATEGY_ID),
        random
      )
    ]).flatten(1)
  );

  return Map({
    parties,
    voters,
    history: makeHistory()
  });
}

export function runElection(electorate) {
  const history = electorate.get('history');
  const parties = electorate.get('parties');
  const voters = electorate.get('voters');

  const votes = (
    voters.map(
      voter => selectVote(voter, parties, history)
    )
  );

  return electorate.set(
    'history',
    extendHistory(history, parties, votes)
  );
}

export function simulate(iterations, voterTypeDistribution) {
  return (
    Repeat(null, iterations)
      .reduce(
        electorate => runElection(electorate),
        makeElectorate({
          voterTypeDistribution
        })
      )
  );
}
