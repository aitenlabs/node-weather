const request = require("request")

const forecast = (lat, lon, callback) => {
    const url_darkSky = `https://api.darksky.net/forecast/69dd2b732a47ddf3c6c26b91156af20d/${lat},${lon}?units=si&lang=it`

    request({ url: url_darkSky, json: true }, (err, res) => {
        if (err) {
            callback("unable to connect to weather service!", undefined)
    
        } else if (res.body.error) {
            callback("unable to find location", undefined)
       
        } else {
            const dataResponse = res.body
            
            const obj_weatherInfo = {
                data: dataResponse
            }

            callback(undefined, obj_weatherInfo)

        }
    })
}

module.exports = forecast









