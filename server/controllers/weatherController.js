const axios = require('axios'); //librería para usar http basado en promesas.
const express = require('express');

// let encodedAddress = encodeURIComponent(argv.address);
// let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

// axios.get(geocodeUrl).then((response) => { //con el get al axios podemos hacer una request a medida, con promises y su tratamiento de errores.
//     //data --> es como el body en el request.
//     if(response.data.status === 'ZERO_RESULTS'){
//         throw new Error('Unable to find that address.'); //throw new Error --> se personaliza el error y lo lanza.
//     }
//     let lat = response.data.results[0].geometry.location.lat;
//     let lng = response.data.results[0].geometry.location.lng;
//     let weatherUrl = `https://api.darksky.net/forecast/aab895c103099c8b19fd607403995a5d/${lat},${lng}`;
//     console.log(response.data.results[0].formatted_address);
//     return axios.get(weatherUrl);
// }).then ((response) => {
//     let temperature = response.data.currently.temperature;
//     let apparentTemperature = response.data.currently.apparentTemperature;
//     console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);    
// }).catch((e) => {
//     if(e.code === 'ENOTFOUND'){
//         console.log('Unable to connect to API servers.');
//     }
//     else{
//         console.log(e.message);
//     }
// });

// ----------------------------------------------

const getGeocodeFromAdress = async(inputAdress) => {
    try{
        const encodedAddress = encodeURIComponent(inputAdress);
        const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;
        const response = await axios.get(geocodeUrl);
        const data = response.data;
        // console.log('data vale: ', data);
        if(data.status === 'ZERO_RESULTS'){
            throw new Error('Unable to find that address.'); //throw new Error --> se personaliza el error y lo lanza.
        }
        else{
            let lat = data.results[0].geometry.location.lat;
            let lng = data.results[0].geometry.location.lng;
            // let formattedAddress = data.results[0].formatted_address;
            // console.log(data.results[0].formatted_address);
            return {lat, lng}; //Cuando se quieren devolver varias cosas(variables) se devuelve un objeto con ellas.   
        }
    
    }catch(e){
        throw new Error();
    }
}
const getTemperatureFromGeocode = async(lat, lng) => {
    let weatherUrl = `https://api.darksky.net/forecast/aab895c103099c8b19fd607403995a5d/${lat},${lng}`;

    try{
        const response = await axios.get(weatherUrl);
        // console.log('Datos vale: ', datos);
        const data = response.data.currently;
        let temperatureFahrenheit = data.temperature;
        console.log('Temperatura en Fahrenheit es: ', temperatureFahrenheit);
        let apparentTemperatureFarenheit = data.apparentTemperature;
        // console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);  
        const {temperature, apparentTemperature} = await temperatureConverter(temperatureFahrenheit, apparentTemperatureFarenheit);
        
        return {
            temperature,
            apparentTemperature,
        }

    }catch(e){
        throw new Error();
    }
}
const coords = async(inputAdress) => {
    const {lat, lng} = await getGeocodeFromAdress(inputAdress);
    const {temperature, apparentTemperature} = await getTemperatureFromGeocode(lat, lng);

    console.log(`Temperaturas: `, temperature, ' y ',  apparentTemperature);
    // let testObject = temperatures;
    // let testObject = temperatures;
    return {
        temperature,
        apparentTemperature, 
        lat, 
        lng
    };
};

const temperatureConverter = async(temperatureFahrenheit, apparentTemperatureFarenheit) => {
    let temperature, apparentTemperature, temperatureCelsius, apparentTemperatureCelsius;
    
    temperatureCelsius = (temperatureFahrenheit - 32) * 5/9;
    apparentTemperatureCelsius = (apparentTemperatureFarenheit - 32) * 5/9;
    temperature = temperatureCelsius.toFixed(2);
    apparentTemperature = apparentTemperatureCelsius.toFixed(2);
    // console.log('Temperatura en centrigrados es: ', temperature);
    return {
        temperature,
        apparentTemperature
    };
};
// const coords = async(inputAdress) => {
//     // const geocodeUrl = await axiosGeocodeUrl(inputAdress);
//     // const getWeatherUrl = await axiosgetWeatherUrl(geocodeUrl);

//     console.log(`Temperaturas: `, getWeatherUrl);
//     const [getWeatherUrl] = await Promise.all([geocodeUrl(), getWeatherUrl()]);
//     let testObjet = [getWeatherUrl];
//     return testObjet;    

    
// };





// let datos;
// let inputAdress;
// inputAdress = '35414 Arucas';

// coords(inputAdress).then((status) => {
//     // console.log('Status vale: ', status);
// }).catch((e) => {
//     if(e.code === 'ENOTFOUND'){
//         console.log('Unable to connect to API servers.');
//     }
//     else{
//         console.log(e.message);
//     } 
// });

// getGeocodeFromAdress(inputAdress).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log('Fallo al ejecutar getGeocodeFromAdress', e);
// });
// // let urltemporal;

// // urltemporal = `https://api.darksky.net/forecast/aab895c103099c8b19fd607403995a5d/28.1201412,-15.5210607
// // // `;
// getTemperatureFromGeocode(28.1201412, -15.5210607).then((status) => {
//     console.log(status);
// }).catch((e) => {
//     console.log('Fallo al ejecutar getTemperatureFromGeocode', e);
// });

// console.log('Coord vale: ', prueba);
// console.log('Datos es guardar: ', datos);
// console.log('Typeof de datos: ', typeof(datos));

module.exports.coords = coords;
// module.exports.axiosGeocodeUrl = axiosGeocodeUrl;




