const request = require('request');
let geocodeAddress = (address, callback) => {
    let encodedAddress = encodeURIComponent(address);
    // Geolocalizacion Google 
    request({
        //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=1301%20lombard%20street%20philadelphia',
        
        //url: 'https://maps.googleapis.com/maps/api/geocode/json?address=ba%C3%B1aderos%20arucas%20bergantin',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true //los datos que vengan en string se pasan a objeto.
    }, (error, response, body) => {
        if(error){
            callback('Unable to connect to Google servers.'); //error por si la url está mal.
        }
        else if(body.status === 'ZERO_RESULTS'){
            callback('Unable to find that address'); //error por si se pone una direccion inexistente.
        }
        else if(body.status === 'OK'){ //si todo funciona bien.
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
        //console.log(JSON.stringify(error, undefined, 2)); //el 2 son las indexaciones que queremos tener.
    });
}

// Otra manera de exportar módulos distinta al de notes.js.
module.exports.geocodeAddress = geocodeAddress;
