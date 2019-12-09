const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

const message1 = document.getElementById("p1")
const message2 = document.getElementById("p2")
const message3 = document.getElementById("p3")
const message4 = document.getElementById("p4")
const message5 = document.getElementById("p5")
message1.textContent = ""
message2.textContent = ""
message3.textContent = ""
message4.textContent = ""
message5.textContent = ""

weatherForm.addEventListener("submit", (e) => {
    if (!e) {
        return message1.textContent = e
    }
        
    e.preventDefault()
    var location = search.value

    message2.textContent = "loading.."
    fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                console.log("error >> " + data)
                message2.textContent= ""
                message1.textContent = data.error

            } else {
                console.log(data)
                var forecast = data.forecast
                var location = data.location
                var address = data.address

                var innerData = forecast.data
                var dataCurrently = innerData.currently

                console.log(innerData)

                var dataCurrently = innerData.currently
                var currentTemp = dataCurrently.temperature
                var roundCurrentPrecipProbability = dataCurrently.precipProbability * 100
                var currentPrecipProbability = Math.round((roundCurrentPrecipProbability * 100) / 100)

                // Implementing 7 days weather ********************************************************************************
                // var dayX = 0
                // var choosenDay = innerData.daily.data[dayX]

                var todayData = innerData.daily.data[0]
                var todaySummary = todayData.summary 
                var todayTempHigh = todayData.temperatureHigh
                var todayTempLow = todayData.temperatureLow
                var todayHumidity = todayData.humidity * 100
                       
                var todaySummary = `${todaySummary} Con una temperatura minima di ${todayTempLow}° ed una massima di ${todayTempHigh}°.` 
                var todayHum = `Umidità al ${todayHumidity}%.`
                var todayForecast = `Al momento ci sono ${currentTemp}° gradi, con ${currentPrecipProbability}% di probabilità di pioggia.`
                var todayIcon = todayData.icon
                
                message1.textContent = location
                message2.textContent = "Sommario del giorno: "
                message3.textContent = todaySummary
                message4.textContent = todayForecast
                message5.textContent = todayHum

            }
        })
    })

    // function setIcons(icon, iconID) {
    //     const skycon = new skycons({ color: "white" })
    //     const currentIcon = 
    // }
})

