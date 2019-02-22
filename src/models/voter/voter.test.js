import { listOf } from '../../utils';
import { makeParties } from '../parties/parties';
import { makeHistory, extendHistory } from '../history/history';
import {
  // STANDARD_STRATEGY_ID,
  LOYALIST_STRATEGY_ID,
  ESTABLISHMENT_STRATEGY_ID,
  ANTI_ESTABLISHMENT_STRATEGY_ID,
  RANDOM_STRATEGY_ID,
  strategyIds,
  makeVoter,
  selectVote
} from './voter';

describe('makeVoter', () => {
  const parties = makeParties();

  it('returns a valid strategyId', () => {
    expect(
      makeVoter(parties).get('strategyId')
    ).toBeInSet(strategyIds)
  });

  it('returns preferences', () => {
    expect(
      makeVoter(parties)
    ).toHave('preferences')
  });
});

describe('selectVote', () => {
  const parties = makeParties(2);
  const partyIds = parties.map(party => party.get('id')).toList();
  const [party1Id, party2Id] = partyIds;

  let history = makeHistory();

  history = extendHistory(
    history,
    parties,
    listOf(() => party1Id, 4)
  );

  history = extendHistory(
    history,
    parties,
    listOf(() => party2Id, 4)
  );

  it('returns a valid partyId', () => {
    const voter = makeVoter(parties, RANDOM_STRATEGY_ID);

    expect(
      selectVote(voter, parties, history)
    ).toBeInSet(partyIds);
  });

  // describe('standardStrategy', () => {
  //   const parties = makeParties(3);
  //   const [id1, id2, id3] = parties.map(party => party.get('id')).toList();
  //   const voter = makeVoter(parties, STANDARD_STRATEGY_ID);
  //
  //   const testStandardStrategy = (counts, expected) => {
  //     const history = extendHistory(
  //       makeHistory(),
  //       parties,
  //       (
  //         parties
  //           .toList()
  //           .map(
  //             party => listOf(
  //               () => party.get('id'),
  //               counts[party.get('id')]
  //             )
  //           )
  //           .flatten(1)
  //       )
  //     );
  //
  //     expect(
  //       selectVote(voter, parties, history)
  //     ).toBe(expected);
  //   };
  //
  //   it('', () => {
  //
  //   })
  // });

  describe('loyalistStrategy', () => {
    const voter = makeVoter(parties, LOYALIST_STRATEGY_ID);

    expect(
      selectVote(voter, parties, history)
    ).toBe(
      voter
        .get('preferences')
        .maxBy(preference => preference.get('payoff'))
        .get('partyId')
    );
  });

  describe('establishmentStrategy', () => {
    const voter = makeVoter(parties, ESTABLISHMENT_STRATEGY_ID);

    expect(
      selectVote(voter, parties, history)
    ).toBe(party2Id);
  });

  describe('antiEstablishmentStrategy', () => {
    const voter = makeVoter(parties, ANTI_ESTABLISHMENT_STRATEGY_ID);

    expect(
      selectVote(voter, parties, history)
    ).toBe(party1Id);
  });

  describe('randomStrategy', () => {
    const voter = makeVoter(parties, RANDOM_STRATEGY_ID);

    expect(
      selectVote(voter, parties, history)
    ).toBeInSet(partyIds);
  });
});
