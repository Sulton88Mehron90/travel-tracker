const destinationData = [{
  "id": 49,
  "destination": "Castries, St Lucia",
  "estimatedLodgingCostPerDay": 650,
  "estimatedFlightCostPerPerson": 90,
  "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
  "alt": "aerial photography of rocky mountain under cloudy sky"
},
{
  "id": 25,
  "destination": "New York, New York",
  "estimatedLodgingCostPerDay": 175,
  "estimatedFlightCostPerPerson": 200,
  "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
},
{
  "id": 22,
  "destination": "Rome, Italy",
  "estimatedLodgingCostPerDay": 90,
  "estimatedFlightCostPerPerson": 650,
  "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "alt": "people standing inside a colosseum during the day"
},
{
  "id": 14,
  "destination": "Marrakesh, Morocco",
  "estimatedLodgingCostPerDay": 70,
  "estimatedFlightCostPerPerson": 830,
  "image": "https://images.unsplash.com/photo-1517821362941-f7f753200fef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
  "alt": "people buying oranges and other fruit from a street vendor"
}]


const getDestinationInfo = (destinationID) => {
  const destination = destinationData.find(destination => destination.id === destinationID);
  return destination;
};

const getCostOfDestination = (destinationID, numTravelers, duration) => {
  const destination = getDestinationInfo(destinationID);
  const lodgingCost = destination.estimatedLodgingCostPerDay * duration;
  const flightCost = destination.estimatedFlightCostPerPerson * numTravelers;
  const agentFee = (lodgingCost + flightCost) * 0.1;

  return lodgingCost + flightCost + agentFee;
};

export { getDestinationInfo, getCostOfDestination, destinationData };