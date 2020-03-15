const request = require('request')

const darkskyApi = process.env.DARKSKY_API

const forecast = (lat, lng, callback) => {
  const url = `https://api.darksky.net/forecast/${darkskyApi}/${lng},${lat}?units=si&lang=tr`

  request(
    { url, json: true },
    (
      error,
      {
        body: {
          error: respError,
          currently: { temperature, precipProbability },
          daily: { data }
        }
      }
    ) => {
      if (error) {
        callback('Some errors occurred: ', null)
      } else if (respError) {
        callback('Unable to find location', null)
      } else {
        callback(null, {
          degrees: temperature,
          precipitation: precipProbability,
          summary: data[0].summary,
          temperatureHigh: data[0].temperatureHigh,
          temperatureLow: data[0].temperatureLow
        })
      }
    }
  )
}

module.exports = forecast
