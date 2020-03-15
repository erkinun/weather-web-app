const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (_, res) => {
  res.render('index', {
    title: 'Weather App!',
    name: 'Erkin Unlu'
  })
})

app.get('/about', (_, res) => {
  res.render('about', {
    title: 'About Weather App',
    name: 'Erkin Unlu'
  })
})

app.get('/help', (_, res) => {
  res.render('help', {
    message: 'This is a help',
    title: 'Help',
    name: 'Erkin Unlu'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'address must be provided'
    })
  } else {
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        console.log('error is: ', error)
        res.send({
          error
        })
      } else {
        forecast(longitude, latitude, (error, forecast) => {
          if (error) {
            res.send({
              error
            })
          } else {
            res.send({
              address: req.query.address,
              location,
              forecast
            })
          }
        })
      }
    })
  }
})

app.get('/help/*', (_, res) => {
  res.render('notfound', {
    title: '404!',
    error: 'Help article not found',
    name: 'Erkin Unlu'
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    res.send({
      error: 'search must be provided'
    })
  } else {
    res.send({
      products: []
    })
  }
})

app.get('*', (_, res) => {
  res.render('notfound', {
    title: '404!',
    error: 'Page not found!',
    name: 'Erkin Unlu'
  })
})

app.listen(port, () => {
  console.log(`server started listening on ${port}`)
})
