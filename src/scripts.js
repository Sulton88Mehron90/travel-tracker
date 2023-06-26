import './css/styles.css';
import './images/turing-logo.png';
import './images/parvin-going-home.jpg';
import { login, getPendingTrips, approveTrip, deleteTrip, searchUserByName } from './apiCalls.js';
import { displayPendingTrips } from './domUpdates.js';

console.log('This is the JavaScript entry file - your code begins here.');


// window.onload = function() {
  document.getElementById('logo').addEventListener('mouseover', sparkle);
  // document.getElementById('green').addEventListener('mouseover', sparkle);
// }

function sparkle(event) {
  var sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.top = `${event.clientY - 30}px`;  // subtracting 10 to center the sparkle
  sparkle.style.left = `${event.clientX - 30}px`;  // subtracting 10 to center the sparkle
  document.body.appendChild(sparkle);
  
  // After a short delay, remove the sparkle element and make it fade out.
  setTimeout(() => {
    sparkle.style.opacity = '9';
  }, 500);
  setTimeout(() => {
    document.body.removeChild(sparkle);
  }, 1000);
}

document.getElementById('search-user-form').addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from submitting normally

  const username = document.getElementById('search-user').value;

  searchUserByName(username)
    .then(data => {
      if (data.users && Array.isArray(data.users)) {
        displayUsers(data.users);
      } else {
        console.error('Invalid data:', data);
      }
    })
    .catch(error => {
      console.log('User search error:', error);
    });
});

function displayUsers(users) {
  const searchResult = document.getElementById('search-result');
  searchResult.innerHTML = ''; // clear previous results
  users.forEach(user => {
    const userElement = document.createElement('p');
    userElement.textContent = `User ID: ${user.id}, Username: ${user.username}`;
    searchResult.appendChild(userElement);
  });
}

// Adding event listener for login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from submitting normally

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // call your login function from apiCalls.js here
  login(username, password)
    .then(response => {
      // Assuming the response has a user object for a successful login
      if (response.user) {
        // successful login, do something here
        // for example, hide login form and show dashboard
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('dashboard').style.display = 'block';

        // Fetch and display pending trips
        updatePendingTrips();
      } else {
        // failed login, do something here
        // for example, show an error message
        alert('Login failed, please check your username and password.');
      }
    })
    .catch(error => {
      console.log('Login error:', error);
    });
});

function updatePendingTrips() {
  getPendingTrips()
    .then(pendingTrips => {
      displayPendingTrips(pendingTrips);

      // Adding event listeners for approve and delete buttons
      const approveButtons = document.querySelectorAll('.approve-button');
      const deleteButtons = document.querySelectorAll('.delete-button');

      approveButtons.forEach(button => {
        button.addEventListener('click', function() {
          const tripId = this.getAttribute('data-trip-id');
          approveTrip(tripId)
            .then(() => {
              // If the trip approval is successful, update the pending trips
              updatePendingTrips();
            })
            .catch(error => {
              console.log('Error approving trip:', error);
            });
        });
      });

      deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
          const tripId = this.getAttribute('data-trip-id');
          deleteTrip(tripId)
            .then(() => {
              // If the trip deletion is successful, update the pending trips
              updatePendingTrips();
            })
            .catch(error => {
              console.log('Error deleting trip:', error);
            });
        });
      });
    })
    .catch(error => {
      console.log('Error fetching pending trips:', error);
    });
}



