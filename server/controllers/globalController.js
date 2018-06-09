const {Weather} = require('../models/Weather');

exports.index = (req, res) => {

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
        return (res.render('index', {
          PreviousSearches: searchedAddress
          }));    
        });
      };  
    })
  }, (e) => {
    res.status(400).send(e);
  });
};