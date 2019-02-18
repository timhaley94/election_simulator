import { listOf } from '../utils';
import { makeParties } from './parties';
import { makeVoter } from './voter';

const VOTERS_IN_DISTRICT = 100;
const DISTRICTS_IN_ELECTORATE = 50;

function makeDistrict(parties) {
  return listOf(
    () => makeVoter(parties),
    VOTERS_IN_DISTRICT
  );
}

export function makeElectorate() {
  const parties = makeParties();

  return Map({
    parties,
    districts: listOf(
      () => makeDistrict(parties),
      DISTRICTS_IN_ELECTORATE
    )
  });
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
