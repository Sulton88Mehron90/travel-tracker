// export function displayTravelers(travelers) {
//   const travelersContainer = document.querySelector('#travelers-container');
//   travelersContainer.innerHTML = '';

//   travelers.forEach(traveler => {
//     const travelerElement = createTravelerElement(traveler);
//     travelersContainer.appendChild(travelerElement);
//   });
// }

// function createTravelerElement(traveler) {
//   const travelerElement = document.createElement('div');
//   travelerElement.classList.add('traveler');

//   const travelerInfo = document.createElement('p');
//   travelerInfo.textContent = `Traveler ID: ${traveler.id}, Name: ${traveler.name}`;
//   travelerElement.appendChild(travelerInfo);

//   return travelerElement;
// }

// export function displayTrips(trips) {
//   const tripsContainer = document.querySelector('#trips-container');
//   tripsContainer.innerHTML = '';

//   trips.forEach(trip => {
//     const tripElement = createTripElement(trip);
//     tripsContainer.appendChild(tripElement);
//   });
// }

// function createTripElement(trip) {
//   const tripElement = document.createElement('div');
//   tripElement.classList.add('trip');

//   const tripInfo = document.createElement('p');
//   tripInfo.textContent = `Trip ID: ${trip.id}, Status: ${trip.status}`;
//   tripElement.appendChild(tripInfo);

//   return tripElement;
// }

// export function displayDestinations(destinations) {
//   const destinationsContainer = document.querySelector('#destinations-container');
//   destinationsContainer.innerHTML = '';

//   destinations.forEach(destination => {
//     const destinationElement = createDestinationElement(destination);
//     destinationsContainer.appendChild(destinationElement);
//   });
// }

// function createDestinationElement(destination) {
//   const destinationElement = document.createElement('div');
//   destinationElement.classList.add('destination');

//   const destinationInfo = document.createElement('p');
//   destinationInfo.textContent = `Destination ID: ${destination.id}, Name: ${destination.name}`;
//   destinationElement.appendChild(destinationInfo);

//   return destinationElement;
// }


export function displayPendingTrips(pendingTrips, userId) {
  const pendingTripsContainer = document.getElementById('pending-trips-container');
  pendingTripsContainer.innerHTML = '';

  pendingTrips.forEach(trip => {
    const tripElement = createTripElement(trip);
    pendingTripsContainer.appendChild(tripElement);
  });

  // Calculate and display the total amount spent on trips
  const totalAmount = calculateTotalAmount(userId, pendingTrips);
  displayTotalAmount(totalAmount);
}

function createTripElement(trip) {
  const tripElement = document.createElement('div');
  tripElement.classList.add('trip');

  const tripInfo = document.createElement('p');
  tripInfo.textContent = `Trip ID: ${trip.id}, Status: ${trip.status}`;
  tripElement.appendChild(tripInfo);

  return tripElement;
}

function calculateTotalAmount(userId, trips) {
  // Filter trips by user ID
  const userTrips = trips.filter(trip => trip.userId === userId);

  // Calculate total amount spent on trips
  let totalAmount = 0;
  userTrips.forEach(trip => {
    totalAmount += trip.cost;
  });

  // Add travel agent's 10% fee
  const agentFee = totalAmount * 0.1;
  totalAmount += agentFee;

  return totalAmount;
}

function displayTotalAmount(totalAmount) {
  const totalAmountContainer = document.getElementById('total-amount');
  totalAmountContainer.textContent = `Total Amount Spent this Year: $${totalAmount.toFixed(2)}`;
}
