// Express JS
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// API functions
const geoCode = require('./Utils/geocode.js');
const forecast = require('./Utils/Forecast.js');

//set up paths for Express config
const publicFileDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')


// set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set-up static directory to serve
app.use(express.static(publicFileDirectory))


// handlebars routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lauren'
    })
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'All about us',
        name: 'Lauren'
    })
})

// help page
app.get('/help', (req, res)=> {
    res.render('help', {
        title: 'Help Page',
        helpText: 'If you are seeing this message, you must be lost!. Try going back to localhost:3000',
        name: 'Lauren'
    })
})

// weather page
app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: "Please enter a location"
        })
    }

// with default value so that it can run and pass over into error handling
    geoCode(req.query.address, (error, {latitude, longitude, location} ={}) => {
        if(error) {
            return res.send({ error })
        }
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) {
                    return res.send ({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


// everything else that has not been matched before that starts with help
app.get('/help/*', (req, res) => {
    res.render('help404',{
        title: "Help 404 page",
        Texthelp: "Uh Oh! This page isn't ready. Let's go back to the help menu",
        name:"Lauren"})
})



// everything else that has not been matched before
app.get('*', (req, res) => {
    res.render("404page", {
        title: "404 page",
        Text404: "Uh Oh! This page isn't ready. Let's go back",
        name: 'Lauren'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})