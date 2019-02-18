import { List, Map } from 'immutable';
import { weightedMovingAverage } from '../utils';

export function makeHistory() {
  return List();
}

function getResults(parties, votes) {
  return (
    parties.mapEntries(
      ([partyId, ...rest]) => {
        const count = (
          votes
            .filter(vote => vote === partyId)
            .count()
        );

        return [
          partyId,
          Map({
            partyId,
            winPercentage: (count / votes.count())
          })
        ];
      }
    )
  );
}

export function extendHistory(history, parties, votes) {
  return (
    history.unshift(
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
      ([partyId, ...rest]) => [
        partyId,
        Map({
          partyId,
          winPercentage: weightedMovingAverage(
            i => (
              history
                .get(i)
                .get(partyId)
                .get('winPercentage')
            ),
            Math.min(
              history.count(),
              10
            )
          )
        })
      ]
    )
  );
}
