const travelersTestData = [{
  "id": 1,
  "name": "Ham Leadbeater",
  "travelerType": "relaxer"
  },
  {
  "id": 2,
  "name": "Rachael Vaughten",
  "travelerType": "thrill-seeker"
  },
  {
  "id": 3,
  "name": "Sibby Dawidowitsch",
  "travelerType": "shopper"
  },
  {
  "id": 4,
  "name": "Leila Thebeaud",
  "travelerType": "photographer"
  },
  {
  "id": 5,
  "name": "Tiffy Grout",
  "travelerType": "thrill-seeker"
}
];

const getTravelerInfo = (userID) => {
  console.log("getTravelerInfo", userID) //consoles
return travelersTestData.find(traveler => traveler.id === userID);
};

export { getTravelerInfo, travelersTestData };