import chai from 'chai';
const expect = chai.expect;
import { getPastTrips, getUpcomingTrips, tripsData } from './trips-function';

describe('getPastTrips', function () {
    it('should return the correct past trips for a given userID', function () {
        const userID = 44;
        const result = getPastTrips(userID);
        expect(result).to.deep.equal([
            {
                "id": 1,
                "userID": 44,
                "destinationID": 49,
                "travelers": 1,
                "date": "2022/09/16",
                "duration": 8,
                "status": "approved",
                "suggestedActivities": []
            },
            {
                "id": 46,
                "userID": 44,
                "destinationID": 33,
                "travelers": 2,
                "date": "2020/08/24",
                "duration": 11,
                "status": "approved",
                "suggestedActivities": []
            }
        ]);
    });

    it('should return an empty array if there are no past trips for a given userID', function () {
        const userID = 999;
        const result = getPastTrips(userID);
        expect(result).to.deep.equal([]);
    });

    it('should handle non-numeric values for userID', function () {
        expect(() => getPastTrips("invalidID")).to.throw(Error);
    });


});

describe('getUpcomingTrips', function () {
    it('should return the correct upcoming trips for a given userID', function () {
        const userID = 38;
        const result = getUpcomingTrips(userID);
        expect(result).to.deep.equal([
            {
                "id": 71,
                "userID": 38,
                "destinationID": 28,
                "travelers": 1,
                "date": "2020/05/26",
                "duration": 11,
                "status": "pending",
                "suggestedActivities": []
            }
        ]);
    });
});
