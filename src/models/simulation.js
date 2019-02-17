const VOTERS_IN_DISTRICT = 100;
const DISTRICTS_IN_ELECTORATE = 50;

function makeDistrict(parties) {
  return repeat(
    () => makeVoter(parties),
    VOTERS_IN_DISTRICT
  );
}

export function makeElectorate() {
  const parties = makeParties();

  return repeat(
    () => makeDistrict(parties),
    DISTRICTS_IN_ELECTORATE
  );
}

function runDistrictElection(district) {
  const votes = parties.keySeq();

  district.forEach(
    voter => {
      const selectedPartyId = selectVote(voter, history);


    }
  );
}

export function runElection() {

}
