import { List, Set } from 'immutable';
import { makeParties } from '../parties/parties';
import {
  makeHistory,
  extendHistory,
  getLastStats,
  getRollingStats
} from './history';

describe('makeHistory', () => {
  it('creates an empty list', () => {
    expect(
      makeHistory().equals(List())
    ).toBe(true)
  });
});

describe('extendHistory', () => {
  const parties = makeParties(2);
  const [party1Id, party2Id] = Set.fromKeys(parties).toList();

  it('adds results to list', () => {
    let history = makeHistory();

    expect(history.count()).toBe(0);

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party1Id,
        party2Id
      ])
    );

    expect(history.count()).toBe(1);

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party2Id,
        party2Id
      ])
    );

    expect(history.count()).toBe(2);
  });

  it('prepends new data, while maintaining old data', () => {
    let history = makeHistory();

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party1Id,
        party2Id
      ])
    );

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party2Id,
        party2Id
      ])
    );

    expect(
      history
        .get(0)
        .get(party2Id)
        .get("winPercentage")
    ).toBeGreaterThan(0.5);

    expect(
      history
        .get(1)
        .get(party1Id)
        .get("winPercentage")
    ).toBeGreaterThan(0.5);
  });

  it('results include entry for every party', () => {
    let history = makeHistory();

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party1Id,
        party2Id
      ])
    );

    const results = history.get(0);

    expect(
      results.has(party1Id)
    ).toBe(true);

    expect(
      results.has(party2Id)
    ).toBe(true);
  });

  it('each entry includes valid winPercentage', () => {
    let history = makeHistory();

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party1Id,
        party2Id
      ])
    );

    const results = history.get(0);

    results.forEach(
      result => {
        expect(
          result.has('winPercentage')
        ).toBe(true);

        expect(
          result.get('winPercentage')
        ).toBeWithinRange(0, 1);
      }
    )
  });

  it('winPercentages for all entries in results sum to 1', () => {
    let history = makeHistory();

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party1Id,
        party2Id
      ])
    );

    const sum = (
      history
        .get(0)
        .reduce(
          (acc, result) => acc + result.get('winPercentage'),
          0
        )
    );

    expect(sum).toBeWithinRange(0.999, 1.001);
  });
});

describe('getLastStats', () => {
  it('returns first set of results', () => {
    const parties = makeParties(2);
    const [party1Id, party2Id] = Set.fromKeys(parties).toList();
    let history = makeHistory();

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party1Id,
        party1Id,
        party2Id
      ])
    );

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party2Id,
        party2Id,
        party2Id
      ])
    );

    expect(
      getLastStats(history)
        .get(party2Id)
        .get('winPercentage')
    ).toBe(0.75);
  });
});

describe('getRollingStats', () => {
  it('uses weighted moving average', () => {
    const parties = makeParties(2);
    const [party1Id, party2Id] = Set.fromKeys(parties).toList();
    let history = makeHistory();

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party1Id,
        party1Id,
        party2Id
      ])
    );

    history = extendHistory(
      history,
      parties,
      List([
        party1Id,
        party2Id,
        party2Id,
        party2Id
      ])
    );

    expect(
      getRollingStats(history, parties)
        .get(party2Id)
        .get('winPercentage')
    ).toBeGreaterThan(0.5);
  });
});
