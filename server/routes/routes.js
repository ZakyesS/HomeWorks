
const express = require('express');

const router = express.Router();

const globalController = require('../controllers/globalController');
const weatherController = require('../controllers/weatherController');
const {Weather} = require('../models/Weather');


// Index App route
router.get('/', globalController.index);

router.post('/', (req, res) => {
    console.log('Recibiendo: ', req.body);

    let inputAdress = req.body.inputAdress;
    let prueba;
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
    weatherController.coords(inputAdress).then((status) => {
        // console.log('Status es: ', status);   

        // -------------- Almacenar en la DB --------------
        let weather;
        weather = new Weather({
            address: inputAdress,
            currentlyTemperature: status.temperature,
            apparentTemperature: status.apparentTemperature,
            latitude: status.lat,
            longitude: status.lng,
        });
        weather.save().then((doc) => {
            //  console.log('Doc vale: ', doc, '------');
            // res.send(doc);
            console.log('Saving in database id: ', doc._id);
        }, (e) => {
            res.status(400).send(e);
        });
        // return status;
        let searchedAddress = [];

        Weather.find({}).then((weathers) => {
            Weather.count(weathers).then((count) => {
              let number = count;
              console.log('Hay ', number, 'consultas a la DB');
              return number;
            }).then((number) => {
                if(number === 0){
                    console.log('There are ', number, ' consults in DB');
                    return (res.render('index'));
                }
                else if(number < 5){
                    console.log('There are ', number, ' consults in DB');
                    Weather.find({}).limit(5).then((weathers) => {
                        // console.log('weathers: ', weathers);
                        for(let i=0; i<weathers.length; i++){
                        searchedAddress.push(weathers[i].address);
                        }
                        return searchedAddress;
                    }).then((searchedAddress) => {
                        return (res.render('index', {
                            Address: JSON.stringify(inputAdress),
                            Temperature: JSON.stringify(status.temperature), 
                            ApparentTemperature: JSON.stringify(status.apparentTemperature),
                            Latitude: JSON.stringify(status.lat),
                            Longitude: JSON.stringify(status.lng),
                            PreviousSearches: searchedAddress
                        }));    
                    });
                }
                else{
                    Weather.find({}).skip(number-5).limit(5).then((weathers) => {
                        // console.log('weathers: ', weathers);
                        for(let i=0; i<weathers.length; i++){
                        searchedAddress.push(weathers[i].address);
                        }
                        return searchedAddress;
                    }).then((searchedAddress) => {
                        // //---------------- Renderizar lo está haciendo bien. -----------------
                        // console.log('Renderizando ... ');
                        return (res.render('index', {
                            Address: JSON.stringify(inputAdress),
                            Temperature: JSON.stringify(status.temperature), 
                            ApparentTemperature: JSON.stringify(status.apparentTemperature),
                            Latitude: JSON.stringify(status.lat),
                            Longitude: JSON.stringify(status.lng),
                            PreviousSearches: searchedAddress
                        }));    
                    });
                };
            });
        }), 
            (e) => {
                res.status(400).send(e);
            }
        })
    .catch((e) => {
        if(e.code === 'ENOTFOUND'){
            console.log('Unable to connect to API servers.');
        }
        else{
            console.log(e.message);
        }
    });
});

// router.get('/weather', (req, res) => {

//     console.log('Datos de /weather: ', req.body);
//     // res.redirect('/');

// });
// req solo sale un objeto enorme
// req.body es undefined
//req.query['inputAdress'] undefined
// req.body.inputAdress no existe

// router.post('/weather', (req, res) => {
//     // let almacen = req.body.inputAdress;
//     // let almacen = req.params.inputAdress;
//     let almacen = req.query.inputAdress;
//    console.log('Recibiendo de POST /post: ', JSON.stringify(almacen));
// });

// app.post ('/post', globalController.addClient);

// router.get('/post', client.showInputAdress);
// router.post('/post', weatherController.obtenerDatos);
module.exports = router;
