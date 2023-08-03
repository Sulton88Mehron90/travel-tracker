// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');


/* ~~~~~~~~~~ IMPORTS ~~~~~~~~~~*/
import './css/styles.css';
import './images/turing-logo.png';
import './images/parvin-going-home.jpg';
import { fetchTravelers, fetchTrips, fetchDestinations } from './apiCalls';
import {
  loginForm,
  loginSection,
  homePage,
  usernameInput,
  passwordInput,
  calendar,
  headerWelcome

} from './domUpdates';

/* ~~~~~~~~~~ DATA MODEL ~~~~~~~~~~*/ 

/* ~~~~~~~~~~ Global Variables ~~~~~~~~~~*/

let date = new Date();
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);
let travelers, trips, destinations, newUser;

/* ~~~~~~~~~~ Fetch Requests  ~~~~~~~~~~*/
window.addEventListener('load', function () {
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
   
  })
  .catch(error => {
    console.error('There was a problem with the fetch', error);
  });
});

//sparkle
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


const getTravelerInfo = (userID) => {

  console.log("getTravelerInfo", userID)

  return travelers.find(traveler => traveler.id === userID);

};

//login

loginForm.addEventListener('submit', checkUserLogin);

function checkUserLogin(event) {
  event.preventDefault();
  const id = +usernameInput.value.match(/\d+/g);
  const string = usernameInput.value.slice(0, 8);
  if (
    string === "traveler" &&
    Number(id) > 0 &&
    Number(id) <= 50 &&
    passwordInput.value === "travel"
  ) {
    newUser = getTravelerInfo(Number(id)); 

    console.log('New User:', newUser);
    console.log('New User:', Number(id));


    loginSection.classList.add("hidden");
    homePage.classList.remove('hidden');
    updateDOM();
  }
};


function displayCalendar() {
  calendar.innerHTML = `<input id="dateInput" type="date" min="${currentDate.split('/').join('-')}" name="calendar" placeholder="yyyy/mm/dd" required>`;
};

function displayWelcomeMessage() {
  headerWelcome.innerText = `Welcome, ${newUser.name}`;
};

// function displayWelcomeMessage() {
//   if (newUser && newUser.name) {
//     headerWelcome.innerText = `Welcome, ${newUser.name}`;
//   } else {
//     headerWelcome.innerText = "Welcome!";
//   }
// }


function updateDOM() {
  displayCalendar();
  // showPastTrips();
  // showUpcomingTrips();
  // showTotalSpent();
  displayWelcomeMessage();
  // displayDestinationsList();
};




export {

};