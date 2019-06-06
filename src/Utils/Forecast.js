// Get weather forecast
const request = require('request')


// forecast function
const forecast = (lat, lng, callback) => {
    const url = 'https://api.darksky.net/forecast/96e81f637dd1f4ce6c1245f149b78112/' + lat+','+lng +'?units=si'
      // make request and get JSON response
      request({ url, json: true}, (error, {body}) => {
        // check for errors in internet and location 
        if (error) {
            callback('Unable to connect to Dark Sky Sky API! Check internet connection or is the site down?', undefined);
        } else if (body.error) {
            callback('Unable to retrieve location forecast, please try again or try another address', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' and there is a ' 
                                    + body.currently.precipProbability + ' % chance of rain. The wind is ' + body.currently.windSpeed +
                                     ' m/s which makes the real temperature feel like ' + body.currently.apparentTemperature + '.') ;
            }
        })
}

module.exports = forecast; 