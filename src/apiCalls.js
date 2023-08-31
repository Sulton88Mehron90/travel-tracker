// function fetchData(endpoint) {
//   return fetch(`http://localhost:3001/api/v1/${endpoint}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(`Failed to fetch ${endpoint}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       return data;
//     })
//     .catch(error => {
//       console.error(error);
//       throw new Error(`An error occurred while fetching ${endpoint}.`);
//     });
// }

function fetchData(endpoint) {
  return fetch(`https://travel-tracker-api-psi.vercel.app/api/v1/${endpoint}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error(error);
      throw new Error(`An error occurred while fetching ${endpoint}.`);
    });
}


function fetchTravelers() {
  return fetchData('travelers');
}

function fetchTrips() {
  return fetchData('trips');
}

function fetchDestinations() {
  return fetchData('destinations');
}


export { fetchTravelers, fetchTrips, fetchDestinations };