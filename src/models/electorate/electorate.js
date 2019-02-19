import { Map, Repeat } from 'immutable';
import { listOf } from '../../utils';
import { makeParties } from '../parties/parties';
import {
  makeVoter,
  selectVote,
  STANDARD_STRATEGY_ID
} from '../voter/voter';
import { makeHistory, extendHistory } from '../history/history';

export const DEFAULT_VOTERS_IN_ELECTORATE = 100;

export function makeElectorate(voterCount = DEFAULT_VOTERS_IN_ELECTORATE) {
  const parties = makeParties();

  return Map({
    parties,
    history: makeHistory(),
    voters: listOf(
      () => makeVoter(parties, STANDARD_STRATEGY_ID),
      voterCount
    )
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

export function simulate({ iterations } = { iterations: 30 }) {
  return (
    Repeat(null, iterations)
      .reduce(
        electorate => runElection(electorate),
        makeElectorate()
      )
  );
}
