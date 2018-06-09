const yargs = require('yargs');
const axios = require('axios'); //librería para usar http basado en promesas.
const argv = yargs
    .options({
        a: {
            demand: false,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }        
    })
    .help()
    .alias('help', 'h')
    .argv;

let encodedAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => { //con el get al axios podemos hacer una request a medida, con promises y su tratamiento de errores.
    //data --> es como el body en el request.
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error('Unable to find that address.'); //throw new Error --> se personaliza el error y lo lanza.
    }
    let lat = response.data.results[0].geometry.location.lat;
    let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/aab895c103099c8b19fd607403995a5d/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
}).then ((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);    
}).catch((e) => {
    if(e.code === 'ENOTFOUND'){
        console.log('Unable to connect to API servers.');
    }
    else{
        console.log(e.message);
    }
});