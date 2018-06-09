const mongoose = require('mongoose');

const Weather = mongoose.model('Weather');

exports.createUser = (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });

  user
    .save()
    .then(() => user.generateAuthToken())
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e => {
      res.status(400).send(e);
    });
};
