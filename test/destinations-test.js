import chai from 'chai';
const expect = chai.expect;
import { getDestinationInfo, getCostOfDestination, destinationData } from './destinations-function';

describe('Destinations', function() {
  let destinations;

  beforeEach(() => {
    destinations = destinationData;
  });

  it('should take in a destinations id', function() {
    expect(destinations[0].id).to.equal(49);
  });

  it('should take in a destinations location', function() {
    expect(destinations[0].destination).to.equal("Castries, St Lucia");
  });

  it('should be able to return a destinations info from an id', function() {
    expect(getDestinationInfo(49)).to.deep.equal({
      "id": 49,
      "destination": "Castries, St Lucia",
      "estimatedLodgingCostPerDay": 650,
      "estimatedFlightCostPerPerson": 90,
      "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      "alt": "aerial photography of rocky mountain under cloudy sky"
      });
  });

  it('should be able to calculate the total cost of the destination based on the destination id, number of travelers, and duration of the trip', function() {
    expect(getCostOfDestination(49, 2, 10)).to.equal(7348);
});

it('should return undefined for an invalid destinationID', function() {
  expect(getDestinationInfo(999)).to.be.undefined;
});


});
