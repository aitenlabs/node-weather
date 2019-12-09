// Packages and files requirements
const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode.js")
const forecast = require("./utils/forecast.js")

const app = express()

// Define Express paths
const publicDir = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))

// app
app.get("", (req, res) => {
    res.render("index", {
        title: "Weather App",
        name: "Andrew Mead"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Andrew"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        helpText: "Help me",
        title: "Help",
        name: "Andrew Mead"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "No address provided"
        })
    }

    var address = req.query.address

    geocode(address, (err, geocodeData = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }
        
        forecast(geocodeData.mapBox_lat, geocodeData.mapBox_long, (err, forecastData = {}) => {
            if (err) {
                return res.send({
                    error: err
                })
            }
    
            res.send({
                forecast: forecastData,
                location: geocodeData.placeName,
                address: req.query.address,
            })
    
        })   
    })

})

app.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Ernesto",
        errorMessage: "Help article not found."
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Ernesto",
        errorMessage: "Page not found."
    }) 
})

app.listen(3000, () => {
    console.log("The server is starting up..")
})

