const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locParagraph = document.querySelector('.location')
const forecastParagraph = document.querySelector('.forecast')
const tempParagraph = document.querySelector('.temperature')
const tempHigh = document.querySelector('.temp-high')
const tempLow = document.querySelector('.temp-low')

weatherForm.addEventListener('submit', e => {
  e.preventDefault()

  const location = search.value

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        locParagraph.textContent = data.error
      } else {
        locParagraph.textContent = data.location
        forecastParagraph.textContent = data.forecast.summary
        tempParagraph.textContent = data.forecast.degrees
        tempHigh.textContent = `Temperature High: ${data.forecast.temperatureHigh}`
        tempLow.textContent = `Temperature Low: ${data.forecast.temperatureLow}`
      }
    })
  })
})
