import { List, Map } from 'immutable';
import { weightedMovingAverage } from './utils';

export function makeHistory() {
  return List();
}

function getResults(parties, votes) {
  const partyIds = Set.fromKeys(parties);

  return (
    votes
      .groupBy(partyId => partyId)
      .map(votes => votes.count())
      .filter(
        (count, partyId) => partyIds.includes(partyId)
      )
      .mapEntries(
        (partyId, count) => ([
          partyId,
          Map({
            partyId,
            winPercentage: (count / votes.count())
          })
        ])
      )
  );
}

export function extendHistory(history, parties, votes) {
  return (
    List.unshift(
      getResults(parties, votes)
    )
  );
}

export function getLastStats(history) {
  return history.first();
}

export function getRollingStats(history, parties) {
  return (
    parties.mapEntries(
      partyId => [
        partyId,
        Map({
          partyId,
          winPercentage: weightedMovingAverage(
            i => (
              history
                .get(i)
                .get(partyId)
                .get("winPercentage")
            )
          )
        })
      ]
    )
  );
}
