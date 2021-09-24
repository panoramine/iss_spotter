const { fetchMyIP , fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation} = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;

//   } else {
//     console.log('It worked! Returned IP:' , ip);
//     return ip;
//   }
// });


// fetchCoordsByIP("24.86.205.26", (error, coordinates) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;

//   } else {
//     console.log("It worked! Returned coordinates: ", coordinates);
//     return coordinates;
//   };
// });


// fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;

//   } else {
//     console.log("It worked!", flyOverTimes);
//   }
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});