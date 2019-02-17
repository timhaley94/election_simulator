import { makeHistory, extendHistory } from './history';
import { makeElectorate, runElection } from './electorate';

export function create() {
  const history = makeHistory();
  const electorate = makeElectorate();

  return {
    history,
    electorate
  };
}

export function step({ electorate, history }) {
  const results = runElection(electorate, history);
  history = extendHistory(history, results);

  return {
    history,
    electorate
  };
}
