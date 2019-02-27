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

const DEFAULT_VOTER_DISTRIBUTION = (
  List([
    Map({
      name: '"Rational"',
      type: 'standard',
      value: 75
    }),
    Map({
      name: 'Loyalist',
      type: 'loyalist',
      value: 5
    }),
    Map({
      name: 'Establishment',
      type: 'establishment',
      value: 5
    }),
    Map({
      name: 'Anti-Establishment',
      type: 'antiEstablishment',
      value: 10
    }),
    Map({
      name: 'Random',
      type: 'random',
      value: 5
    })
  ])
);

export function makeElectorate(voterTypeDistribution = DEFAULT_VOTER_DISTRIBUTION) {
  const findWeight = type => (
    voterTypeDistribution
      .find(entry => entry.get('type') === type)
      .get('value')
  );

  const standard = findWeight('standard');
  const loyalist = findWeight('loyalist');
  const establishment = findWeight('establishment');
  const antiEstablishment = findWeight('antiEstablishment');
  const random = findWeight('random');

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
    voterTypeDistribution,
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
        makeElectorate(voterTypeDistribution)
      )
  );
}

export function setWeight(
  electorate,
  type,
  value
) {
  return (
    electorate.update(
      'voterTypeDistribution',
      distro => (
        distro.update(
          distro.findIndex(entry => entry.get('type') === type),
          entry => entry.set('value', value)
        )
      )
    )
  );
}
