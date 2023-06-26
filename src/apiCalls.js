export function login(username, password) {
  return fetch('http://localhost:3001/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Invalid username or password');
      }
      return response.json();
    })
    .catch(error => console.log('Error:', error));
}

export function getTravelers() {
  return fetch('http://localhost:3001/api/v1/travelers')
    .then(response => response.json())
    .catch(error => console.log('Error:', error));
}

export function getTravelerById(id) {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`)
    .then(response => response.json())
    .catch(error => console.log('Error:', error));
}

export function getTrips() {
  return fetch('http://localhost:3001/api/v1/trips')
    .then(response => response.json())
    .catch(error => console.log('Error:', error));
}

export function getDestinations() {
  return fetch('http://localhost:3001/api/v1/destinations')
    .then(response => response.json())
    .catch(error => console.log('Error:', error));
}

export function addNewTrip(trip) {
  return fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trip)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error adding new trip');
      }
      return response.json();
    })
    .catch(error => console.log('Error:', error));
}

export function addNewDestination(destination) {
  return fetch('http://localhost:3001/api/v1/destinations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(destination)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error adding new destination');
      }
      return response.json();
    })
    .catch(error => console.log('Error:', error));
}

export function updateTrip(trip) {
  return fetch('http://localhost:3001/api/v1/updateTrip', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trip)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error updating trip');
      }
      return response.json();
    })
    .catch(error => console.log('Error:', error));
}

export function deleteTrip(tripId) {
  return fetch(`http://localhost:3001/api/v1/trips/${tripId}`, {
    method: 'DELETE'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error deleting trip');
      }
      return response.json();
    })
    .catch(error => console.log('Error:', error));
}
