const request = require("request")

const geocode = (address, callback) => {
    const url_mapBox = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiYWl0ZW5sYWJzIiwiYSI6ImNrMzhobjJ1djA4dXAzbW95YnBxdWU3bGgifQ.5nbXBStDWZfz4EMS3FUt8g&limit=1`
    
    request({ url: url_mapBox, json: true}, (err, res) => {
        if (err) {
            callback("Unable to connecto to location services!", undefined)

        } else if (res.body.features.length === 0) {
            callback(`Non riesco a trovare nessun posto con ${address} sul pianeta terra, cerca un altro luogo.`, undefined)
        
        } else if (res.body.error) {
            callback(res.body)
        
        } else {
            callback(undefined, {
                res: res.body.features[0],                
                placeName: res.body.features[0].place_name,
                mapBox_lat: res.body.features[0].center[1],
                mapBox_long: res.body.features[0].center[0]
                

            })
        }
    })
}

module.exports = geocode