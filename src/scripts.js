
console.log('This is the JavaScript entry file - your code begins here.');

import './css/styles.css';
import './images/turing-logo.png';
import './images/parvin-going-home.jpg';

// Import API Calls

import { fetchTravelers, fetchTrips, fetchDestinations } from './apiCalls';

/* ~~~~~~~~~~ DATA MODEL ~~~~~~~~~~*/

// Global Variables
let travelers, trips, destinations;

// Fetch Requests 

Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()])
  .then(([travelersData, tripsData, destinationsData]) => {
    console.log("In PromiseAll:", travelersData);
    console.log("In PromiseAll:", tripsData);
    console.log("In PromiseAll:", destinationsData);

    travelers = travelersData.travelers;
    console.log("In THEN of PromiseAll:", travelers);
    trips = tripsData.trips;
    console.log("In THEN of PromiseAll:", trips);
    destinations = destinationsData.destinations;
    console.log("In THEN of PromiseAll:", destinations);
    // initializeApp();
  })
  .catch(error => {
    console.error('There was a problem with the fetch', error);
  });


  document.getElementById('logo').addEventListener('mouseover', sparkle);


function sparkle(event) {
  var sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.top = `${event.clientY - 30}px`;
  sparkle.style.left = `${event.clientX - 30}px`;
  document.body.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.style.opacity = '9';
  }, 500);
  setTimeout(() => {
    document.body.removeChild(sparkle);
  }, 1000);
}
