/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      return callback(Error(msg), null);
    }

    const data = JSON.parse(body);
    return callback(null, data.ip);

  });
};


const fetchCoordsByIP = function(ip, callback) {
  request('https://freegeoip.app/json/' + ip, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates. Response: ${body}`;
      return callback(Error(msg), null);
    }

    let data = {};
    data.latitude = JSON.parse(body).latitude;
    data.longitude = JSON.parse(body).longitude;
    return callback(null, data);
  });
};


const fetchISSFlyOverTimes = function(coordinates, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coordinates.latitude}&lon=${coordinates.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching flyover times. Response: ${body}`;
      return callback(Error(msg), null);
    }

    let data = JSON.parse(body).response;
    return callback(null, data);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("ip fetching didn't work!");
      return callback(error, null);
    }

    fetchCoordsByIP(ip , (error, coords) => {
      if (error) {
        console.log("coord fetching didn't work!");
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coords, (error, flyOverTimes) => {
        if (error) {
          console.log("flyover times didn't work!");
          return callback(error, null);
        }

        callback(null, flyOverTimes);
      });
    });
  });
};

module.exports = { fetchMyIP , fetchCoordsByIP , fetchISSFlyOverTimes, nextISSTimesForMyLocation };