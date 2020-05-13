const mongoose = require('mongoose');
const accountModel = require('../models/account');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


exports.signupUser = (req, res) => {

      const errors = validationResult(req);

      if (errors.isEmpty()) {

        accountModel.getUser({username: req.body.username}, (err, result) => {
          if (result) {
            console.log(result);
            // Match found
            req.flash('error_msg', 'Username is already taken.');
            res.redirect('/login');
          } else {
            // Match not found
           const saltRounds = 10;

            bcrypt.hash(req.body.password, saltRounds, (err, hashed) => {
              const newAccount = {
                  _id: new mongoose.Types.ObjectId(),
                  name: req.body.name,
                  username: req.body.username,
                  email: req.body.email,
                  password: hashed,
                  isAdmin: req.body.userType,
                  imagePath: `img/${req.body.gender}.png`
              };
              console.log(newAccount);

              accountModel.create(newAccount, (err, user) => {
                if (err) {
                  req.flash('error_msg', 'Could not create user. Please try again.');
                  res.redirect('/register');
                  // res.status(500).send({ message: "Could not create user"});
                } else {
                  req.flash('success_msg', 'You are now registered! Login below.');
                  res.redirect('/login');
                }
              });
            });

          }
        });
      } else {
        const messages = errors.array().map((item) => item.msg);

        req.flash('error_msg', messages.join(' '));
        res.redirect('/signup');
      }

  };


exports.loginUser = (req, res) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const {
      username,
      password
    } = req.body;


    accountModel.getUser({username: username}, (err, Account) => {
      if (err) {
        // Database error occurred...
        req.flash('error_msg', 'ERROR occurred in db! Please try again.');
        res.redirect('/login');
      } else {

        // Successful query
        if (Account) {
          console.log(Account);
          console.log("Successfully found user!");

          bcrypt.compare(password, Account.password, (err, result) => {

          // Passwords match
            if (result) {
              req.session.Account = Account._id;
              req.session.name = Account.name;
              req.session.email = Account.email;
              req.session.username = Account.username;
              req.session.imagePath = Account.imagePath;
              req.session.isAdmin = Account.isAdmin;

              console.log(req.session);

              res.redirect('/profile');
            } else {
              // passwords don't match
              req.flash('error_msg', 'Incorrect password. Please try again.');
              res.redirect('/login');
            }
          });

        } else {
          // No user found
          req.flash('error_msg', 'No registered user with that username. Please signup.');
          res.redirect('/signup');
        }
      }
    });

  } else {
    const messages = errors.array().map((item) => item.msg);

    req.flash('error_msg', messages.join(' '));
    res.redirect('/login');
  }

};

exports.logoutUser = (req, res) => {
  if (req.session) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.redirect('/login');
    });
  }
};