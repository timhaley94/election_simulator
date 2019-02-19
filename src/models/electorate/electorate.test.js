import {
  makeElectorate,
  runElection,
  DEFAULT_VOTERS_IN_ELECTORATE
} from './electorate';

describe('makeElectorate', () => {
  it('has parties', () => {
    expect(
      makeElectorate()
    ).toHave('parties');
  });

  it('has history', () => {
    expect(
      makeElectorate()
    ).toHave('history');
  });

  it('has voters', () => {
    expect(
      makeElectorate()
    ).toHave('voters');
  });

  it('can use DEFAULT_VOTERS_IN_ELECTORATE', () => {
    expect(
      makeElectorate().get('voters').count()
    ).toBe(DEFAULT_VOTERS_IN_ELECTORATE);
  });

  it('respects voterCount argument', () => {
    expect(
      makeElectorate(
        DEFAULT_VOTERS_IN_ELECTORATE + 1
      ).get('voters').count()
    ).toBe(DEFAULT_VOTERS_IN_ELECTORATE + 1);
  });
});

describe('runElection', () => {
  let electorate = makeElectorate();

  const history = electorate.get('history');
  const parties = electorate.get('parties');
  const voters = electorate.get('voters');

  electorate = runElection(electorate);

  it('maintains parties', () => {
    expect(
      electorate.get('parties').equals(parties)
    ).toBe(true);
  });

  it('maintains voters', () => {
    expect(
      electorate.get('voters').equals(voters)
    ).toBe(true);
  });

  it('extends history', () => {
    expect(
      electorate.get('history').count()
    ).toBe(
      history.count() + 1
    )
  });
});
