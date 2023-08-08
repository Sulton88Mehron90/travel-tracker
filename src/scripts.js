/* ~~~~~~~~~~ imports ~~~~~~~~~~*/
import './css/styles.css';
import './images/turing-logo.png';
import './images/parvin-going-home.jpg';
import './images/taking-picture.png';
import './images/in-a-hurry.png';
import './images/plane.png'
import dayjs from 'dayjs';
import { fetchTravelers, fetchTrips, fetchDestinations } from './apiCalls';
import {
  loginForm,
  loginSection,
  homePage,
  usernameInput,
  passwordInput,
  calendar,
  estimatedCost,
  numTravelersInput,
  upcomingTripsList,
  durationInput,
  destinationDropdown,
  displayCalendar,
  displayWelcomeMessage,
  displayDestinationsList,
  showPastTrips,
  showUpcomingTrips,
  showTotalSpent
} from './domUpdates';

/* ~~~~~~~~~~ Global Variables ~~~~~~~~~~*/
let date = new Date();
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + ("0" + date.getDate()).slice(-2);
let travelers, trips, destinations, newUser;

/* ~~~~~~~~~~ Fetch Requests  ~~~~~~~~~~*/
window.addEventListener('load', function () {
  Promise.all([fetchTravelers(), fetchTrips(), fetchDestinations()])
    .then(([travelersData, tripsData, destinationsData]) => {
      console.log("In PromiseAll:", travelersData, tripsData, destinationsData);//consoles
      travelers = travelersData.travelers;
      trips = tripsData.trips;
      destinations = destinationsData.destinations;
      console.log("destinations - In THEN of PromiseAll:", destinations);//consoles
      console.log("travelers - In THEN of PromiseAll:", travelers); //consoles
      console.log("trips - In THEN of PromiseAll:", trips); //consoles
    })
    .catch(error => {
      console.error('There was a problem with the fetch', error);
    });
});

/* ~~~~~~~~~~ Day.js. Displaying the Date on Your Website ~~~~~~~~~~*/
const now = dayjs();
const formattedDate = now.format('dddd, MMMM D YYYY, h:mm A');
document.getElementById('dateElement').innerText = formattedDate;

function updateDateTime() {
  const now = dayjs();
  const formattedDate = now.format('dddd, MMMM D YYYY, h:mm A');
  document.getElementById('dateElement').innerText = formattedDate;
};

setInterval(updateDateTime, 60000);
updateDateTime();

/* ~~~~~~~~~~ Sparkle function ~~~~~~~~~~*/
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

/* ~~~~~~~~~~ Helper functions to get traveler info  ~~~~~~~~~~*/
const getTravelerInfo = (userID) => {
  console.log("getTravelerInfo", userID) //consoles
  return travelers.find(traveler => traveler.id === userID);
};

const getPastTrips = (userID) => {
  console.log('getPastTrips called with userID:', userID); //consoles
  return trips.filter(trip => trip.userID === userID && trip.status === 'approved');
};

const getUpcomingTrips = (userID) => {
  console.log('getUpcomingTrips called with userID:', userID);//consoles
  return trips.filter(trip => trip.userID === userID && trip.status === 'pending');
};

const getDestinationInfo = (destinationID) => {
  console.log('getDestinationInfo called with destinationID:', destinationID);//consoles
  const destination = destinations.find(destination => destination.id === destinationID);
  console.log('getDestinationInfo returned: ', destination);  //consoles
  return destination;
};

const getCostOfDestination = (destinationID, numTravelers, duration) => {
  console.log('Type of numTravelers:', typeof numTravelers); //consoles
  console.log('Type of duration:', typeof duration); //consoles
  console.log('getCostOfDestination called with numTravelers:', numTravelers);//consoles
  const destination = getDestinationInfo(destinationID);
  console.log('Destination info for calculationdestination: ', destination); // consoles
  const lodgingCost = destination.estimatedLodgingCostPerDay * duration;
  const flightCost = destination.estimatedFlightCostPerPerson * numTravelers;
  const agentFee = (lodgingCost + flightCost) * 0.1;

  console.log('getCostOfDestination VAR :', destination, lodgingCost, flightCost, agentFee);//consoles

  return lodgingCost + flightCost + agentFee;
}

/* ~~~~~~~~~~ Login form submit event  ~~~~~~~~~~*/
loginForm.addEventListener('submit', checkUserLogin);

function checkUserLogin(event) {
  event.preventDefault();
  const id = +usernameInput.value.match(/\d+/g);
  console.log('usernameInput:', id); //consoles
  const string = usernameInput.value.slice(0, 8);
  console.log('usernameInput:', string); //consoles

  if (
    string === "traveler" &&
    Number(id) > 0 &&
    Number(id) <= 50 &&
    passwordInput.value === "travel"
  ) {
    newUser = getTravelerInfo(Number(id));

    console.log('New User:', newUser); //consoles
    console.log('New User:', Number(id)); //consoles

    loginSection.classList.add("hidden");
    homePage.classList.remove('hidden');
    updateDOM();
  } else {
    console.log('Invalid credentials.') //consoles
    document.getElementById('loginError').classList.remove('hidden');
  }
};

function updateDOM() {
  displayCalendar();
  showPastTrips(newUser.id);
  showUpcomingTrips(newUser.id);
  showTotalSpent(newUser.id);
  displayWelcomeMessage(newUser);
  displayDestinationsList();
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = {
    "id": parseInt(trips.length + 1),
    "userID": newUser.id,
    "destinationID": parseInt(destinationDropdown.value),
    "travelers": parseInt(numTravelersInput.value),
    "date": calendar.firstChild.value.split('-').join('/'),
    "duration": parseInt(durationInput.value),
    "status": "pending",
    "suggestedActivities": []
  };

  fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(data => data.json())
    .then(json => console.log(json))
    .catch(err => console.log(`Error at: ${err}`));

  showUpdatedUpcomingTrips(data);
  event.target.reset();
});

function showUpdatedUpcomingTrips(data) {
  const destinationInfo = getDestinationInfo(data.destinationID);
  upcomingTripsList.innerHTML += `
  <li style="font-size: 1.5em">${data.date}: ${destinationInfo.destination} <span style='color: red;'>*pending*</span></li>
  <img src=${destinationInfo.image} alt=${destinationInfo.alt} width="350" height="250"/>
  `;
};

//estimated cost for the trip
form.addEventListener('input', () => {
  if (numTravelersInput.value && durationInput.value) {
    console.log(numTravelersInput.value); //consoles
    console.log("durationInput.value: ", durationInput.value); //consoles
    const totalCost = getCostOfDestination(
      parseInt(destinationDropdown.value),
      parseInt(numTravelersInput.value),
      parseInt(durationInput.value));
    let dollarUSLocale = Intl.NumberFormat('en-US');
    let totalPrice = dollarUSLocale.format(totalCost);
    estimatedCost.innerHTML = `The estimated cost of this trip is <stron>${totalPrice}</strong>!`;
  } else {
    estimatedCost.innerText = "Please provide the number of travelers and duration to estimate the cost.";
  }
});

/* ~~~~~~~~~~ exports ~~~~~~~~~~*/
export {
  date,
  currentDate,
  travelers,
  trips,
  destinations,
  newUser,
  getTravelerInfo,
  getPastTrips,
  getUpcomingTrips,
  getDestinationInfo,
  getCostOfDestination,
  checkUserLogin,
  displayCalendar,
  showPastTrips,
  showUpcomingTrips,
  showTotalSpent,
  displayWelcomeMessage,
  displayDestinationsList,
  showUpdatedUpcomingTrips
};