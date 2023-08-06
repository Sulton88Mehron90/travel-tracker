import chai from 'chai';
const expect = chai.expect;
import {getTravelerInfo} from './travelers-function';

describe('getTravelerInfo', () => {
  it('should return the correct traveler info for a given userID', () => {
    const userID = 2;
    const result = getTravelerInfo(userID);
    expect(result).to.deep.equal({
      id: 2,
      name: 'Rachael Vaughten',
      travelerType: 'thrill-seeker'
    });
  });

  it('should return undefined if the traveler is not found', () => {
    const userID = 99;
    const result = getTravelerInfo(userID);
    expect(result).to.be.undefined;
  });

  it('should return the correct traveler type for a given userID', () => {
    const userID = 3;
    const result = getTravelerInfo(userID);
    expect(result.travelerType).to.equal('shopper');
  });
});
