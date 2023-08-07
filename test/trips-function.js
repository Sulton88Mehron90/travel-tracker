const tripsData = [{
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
    "id": 2,
    "userID": 35,
    "destinationID": 25,
    "travelers": 5,
    "date": "2022/10/04",
    "duration": 18,
    "status": "approved",
    "suggestedActivities": []
},
{
    "id": 3,
    "userID": 3,
    "destinationID": 22,
    "travelers": 4,
    "date": "2022/05/22",
    "duration": 17,
    "status": "approved",
    "suggestedActivities": []
},
{
    "id": 4,
    "userID": 43,
    "destinationID": 14,
    "travelers": 2,
    "date": "2022/02/25",
    "duration": 10,
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
},
{
    "id": 71,
    "userID": 38,
    "destinationID": 28,
    "travelers": 1,
    "date": "2020/05/26",
    "duration": 11,
    "status": "pending",
    "suggestedActivities": []
}];


const getPastTrips = (userID) => {
    if (typeof userID !== 'number') {
        throw new Error('Invalid userID. It should be a numeric value.');
    }

    return tripsData.filter(trip => trip.userID === userID && trip.status === 'approved');
};

const getUpcomingTrips = (userID) => {
    return tripsData.filter(trip => trip.userID === userID && trip.status === 'pending');
};

export { getPastTrips, getUpcomingTrips, tripsData };