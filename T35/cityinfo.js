//code starts by importing the 'isomorphic-fetch' package which is a implementation of the Fetch API 
//that can be used in both the client-side JavaScript and server-side Node.js environments
const fetch = require("isomorphic-fetch");

// Define a function called getCityInfo that takes in a city parameter
const getCityInfo = city => {
  // Create a variable called geoUrl that contains the URL for the geo API, including the city parameter
  const geoUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${city}`;

  // Create a variable called geoOptions that contains the options for the geo API request
  const geoOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '771257942dmsh2c07d8fa14d2b08p15357ajsnfae6a364101c',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
  };

  // Use fetch to make a GET request to the geo API with the geoUrl and geoOptions
  fetch(geoUrl, geoOptions)
    // When the response comes back, convert it to JSON
    .then(res => res.json())
    // Then, with the JSON data, extract the first city data
    .then(json => {
      const cityData = json.data;
      console.log(`Population: ${cityData.population}`);
      console.log(`Elevation: ${cityData.elevationMeters}`);

      // create a variable weatherUrl that contains the URL for the weather API, including the city latitude and longitude
      const weatherUrl = `https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly?lat=${cityData.latitude}&lon=${cityData.longitude}`;

      // create a variable weatherOptions that contains the options for the weather API request
      const weatherOptions = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'a55b309cdbmsh7945b45da90e278p1bee24jsnee2075e00b47',
          'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
        },
        params: {
          lat: cityData.latitude,
          lon: cityData.longitude
        }
      };

      // Use fetch to make a GET request to the weather API with the weatherUrl and weatherOptions
      fetch(weatherUrl, weatherOptions)
        // When the response comes back, convert it to JSON
        .then(res => res.json())
        // Then, with the JSON data, log the current temperature
        .then(json => {
          console.log(`Current temperature: ${json.data[0].temp}°C`);
        })
        // If there is an error with the weather API, log the error
        .catch(err => console.error(`Weather API error: ${err}`));
    })
    // If there is an error with the geo API, log the error
    .catch(err => console.error(`Geo API error: ${err}`));
}
// getCityInfo passes the parameter 'Q2346838' which gets it from wikiDataId: 'Q2346838'
getCityInfo("Q2346838");