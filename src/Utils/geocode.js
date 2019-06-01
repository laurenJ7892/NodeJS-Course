const request = require('request');

// GeoCoding Request

const geoCode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibDg5NzJhIiwiYSI6ImNqdno2dDc0MjBubzAzeXBjd2hmcmlwZTUifQ.KUC9uXxv3NIWc6TasHeFOw'
    // call 
    request({ url, json: true}, (error, {body}) => {
    // check for errors
    if (error) {
        callback('Unable to connect to GeoCode API! Check internet connection or is the site down?', undefined);
    
    } else if (body.features.length ===0 ) {
        callback('Unable to find the location. Please try again and check spelling!', undefined)

    } else {
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
      }
  })
}


module.exports = geoCode