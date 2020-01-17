const express = require('express');
const authRoutes = express.Router();
const User = require('../models/User');

authRoutes.post('/login', (req, res) => {
  const {email, password} = req.body.data;
  User.findOne({email: email})
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.status(200).json({
            msg: 'Found user',
          });
        } else {
          res.status(400).json({
            msg: 'Invalid credentials',
          });
        }
      } else {
        res.status(400).json({
          msg: 'Invalid credentials',
        });
      }
    })
    .catch(err => console.log(error));
});

authRoutes.post('/register', (req, res) => {
  const {name, email, password} = req.body.data;
  const newUser = new User({
    name,
    email,
    password,
  });
  newUser
    .save()
    .then(user => {
      if (user) {
        res.status(200).json({
          msg: 'Successfully created new user!',
          user,
        });
      } else {
        res.status(400).json({
          msg: 'Invalid inputs, please try again',
        });
      }
    })
    .catch(err => console.log(err));
});

module.exports = authRoutes;
