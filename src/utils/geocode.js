const request = require('request')

const mapboxApi = process.env.MAPBOX_API

const geocode = (address, callback) => {
  const mapbox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapboxApi}&limit=1`

  request({ url: mapbox, json: true }, (error, { body: { features } }) => {
    if (error) {
      callback('Unable to connect to location services')
    } else if (features.length === 0) {
      callback('No response has been returned for the search. Try another one')
    } else {
      callback(null, {
        latitude: features[0].center[1],
        longitude: features[0].center[0],
        location: features[0].place_name
      })
    }
  })
}

module.exports = geocode
