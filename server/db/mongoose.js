let mongoose = require('mongoose');

mongoose.Promise = global.Promise; //para que el mongoose use las promises.
// mongoose.connect(process.env.MONGODB_URI);
try{
    const database = 'mongodb://localhost:27017/weatherapp';
    mongoose.connect(database);
    console.log(`Connected to ${database}`);

} catch(e) {
    console.log('Error to connect to DB', e);
}

module.exports = {mongoose};