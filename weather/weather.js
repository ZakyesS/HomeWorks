const request = require('request');

let getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/aab895c103099c8b19fd607403995a5d/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        console.log('----------');
        if(error){
            callback('Unable to connect to [api.darksky.net] server.');
        }
        else if(response.statusCode === 400){
            callback('Unable to fetch weather.');
        }
        else if(response.statusCode === 200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    });   
};

module.exports.getWeather = getWeather;

