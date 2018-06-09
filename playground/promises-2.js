const request = require('request');

let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        let encodedAddress = encodeURIComponent(address);
        // Geolocalizacion Google 
        request({            
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`,
            json: true //los datos que vengan en string se pasan a objeto.
        }, (error, response, body) => {
            if(error){
                reject('Unable to connect to Google servers.'); //error por si la url está mal.
            }
            else if(body.status === 'ZERO_RESULTS'){
                reject('Unable to find that address'); //error por si se pone una direccion inexistente.
            }
            else if(body.status === 'OK'){ //si todo funciona bien.
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                })
            }
        });
    });
};

geocodeAddress('35414').then((location) => {
    console.log(JSON.stringify(location, undefined, 3));
}, (errorMessage) => {
    console.log(errorMessage);
});