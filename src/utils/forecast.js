const request = require("postman-request");

const forecast = (lat, lng, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=822e01587cc04ff60cb802db06ca3c1c&query=' + lat + ',' + lng + '&units=f'
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' +  response.body.current.temperature + ' degrees out. It feels like ' +  response.body.current.feelslike + ' degrees out' + response.body.location.timezone_id)
        }
    })
}

module.exports = forecast