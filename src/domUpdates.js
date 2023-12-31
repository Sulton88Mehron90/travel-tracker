/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/
import {
  currentDate,
  destinations,
  getPastTrips,
  getUpcomingTrips,
  getDestinationInfo,
  getCostOfDestination,
} from './scripts';

/* ~~~~~~~~~~ QUERY SELECTORS ~~~~~~~~~~*/
const logo = document.querySelector('#logo');
const greenImage = document.querySelector('#green');
const loginSection = document.querySelector('#login-section');
const homePage = document.querySelector('#homePage');
const loginForm = document.querySelector('#login-form');
const usernameInput = document.querySelector('#usernameInput');
const passwordInput = document.querySelector('#passwordInput');
const headerWelcome = document.querySelector('#headerWelcome');
const calendar = document.querySelector('#calendar');
const pastTripsList = document.querySelector('#pastTripsList');
const upcomingTripsList = document.querySelector('#upcomingTripsList')
const totalSpent = document.querySelector('#totalSpent');
const form = document.querySelector('#form');
const estimatedCost = document.querySelector('#estimatedCost');
const numTravelersInput = document.querySelector('#numTravelersInput');
const durationInput = document.querySelector('#durationInput');
const destinationDropdown = document.querySelector('#destinationDropdown');

/* ~~~~ DOM MANIPULATION FUNCTIONS ~~~~*/
logo.addEventListener('click', redirectToLogin);

function redirectToLogin() {
  homePage.classList.add('hidden');
  loginSection.classList.remove('hidden');
  document.body.classList.remove('logged-in');
  document.getElementById('green').style.display = 'block';
}

function displayCalendar() {
  calendar.innerHTML = `<input id="dateInput" type="date" min="${currentDate.split('/').join('-')}" name="calendar" placeholder="yyyy/mm/dd" required>`;
}

function displayWelcomeMessage(newUser) {
  headerWelcome.innerText = `Welcome, ${newUser.name}!`;
}

function displayDestinationsList() {
  destinations.forEach(destination => {
    destinationDropdown.innerHTML += `
        <option value="${destination.id}">${destination.destination}</option>
      `;
  });
}

function showPastTrips(userId) {
  let pastTrips = getPastTrips(userId);

  pastTripsList.innerHTML = '';

  pastTrips.forEach(trip => {
    const destinationInfo = getDestinationInfo(trip.destinationID);
    pastTripsList.innerHTML += `
    <li style="font-size: 1.5em">${trip.date}: ${destinationInfo.destination}
    <img src=${destinationInfo.image} alt=${destinationInfo.alt} width="350" height="250"/></li>
    `;
  });
}

function showUpcomingTrips(userId) {
  let upcomingTrips = getUpcomingTrips(userId);

  upcomingTrips.forEach(trip => {
    const destinationInfo = getDestinationInfo(trip.destinationID);

    upcomingTripsList.innerHTML += `
    <li style="font-size: 1.5em">${trip.date}: ${destinationInfo.destination} <span style='color: red;'>*pending*</span>
    <img src=${destinationInfo.image} alt=${destinationInfo.alt} width="350" height="250"/></li>
    `;
  });
}

function showTotalSpent(userId) {
  const pastTrips = getPastTrips(userId);
  const totalCost = Math.round(pastTrips.reduce((acc, trip) => {
    acc += getCostOfDestination(trip.destinationID, trip.travelers, trip.duration);
    return acc;
  }, 0));
  let dollarUSLocale = Intl.NumberFormat('en-US');
  let totalPrice = dollarUSLocale.format(totalCost);
  totalSpent.innerHTML = `Total amount spent on trips: <strong> $${totalPrice} </strong>`;
}

/* ~~~~~~~~~~ EXPORTS ~~~~~~~~~~*/
export {
  loginForm,
  loginSection,
  homePage,
  usernameInput,
  passwordInput,
  calendar,
  headerWelcome,
  pastTripsList,
  totalSpent,
  form,
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
};
