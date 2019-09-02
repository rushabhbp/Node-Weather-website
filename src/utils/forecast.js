const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 
'https://api.darksky.net/forecast/62e13c5d58e5bfb674451e5982bbac12/'+latitude+','+longitude+'?unit=si'

    request({url,json:true}, (error,{body}) => {
        if(error){
            callback("Cannot connect to service.",undefined)
        } else if (body.error) {
             callback("Unable to find location.",undefined)
        } else {
             const currently = body.currently
             callback(undefined,body.daily.data[0].summary + "It is currently "+ currently.temperature+
             " degrees out. There is "+currently.precipProbability+"% chance of rain")
        }
     })
}

module.exports = forecast