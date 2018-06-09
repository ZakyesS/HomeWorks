const express = require('express');
// const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const hbs = require('express-handlebars');
const bodyParser = require('body-parser');

mongoose
  .connect('mongodb://localhost:27017/weatherapp')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Loading Models
require('./models/Weather');


const app = express();

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes');


const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));



app.engine(
    '.hbs',
    hbs({
      defaultLayout: 'main',
      extname: '.hbs',
      layoutsDir: path.join(__dirname, 'views/layouts'),
      partialsDir: path.join(__dirname, 'views/partials'),
    }),
  );
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));
  
app.use('/', routes);

app.use('/public', express.static('public'));


app.listen(port, () => {
    console.log(`Sever is up on port ${port}`);
}); 

