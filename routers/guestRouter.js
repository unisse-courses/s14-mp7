const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const reservationController = require('../controllers/reservationController');
const { signupValidation, loginValidation } = require('../validators.js');
const { isLoggedOut, isLoggedIn } = require('../middlewares/checkAuth');


// Login Route
router.get('/login',  (req, res) => {
  res.render('loginform', {layout: 'main2'})
});


// Login POST
router.post('/login', loginValidation, accountController.loginUser);

// Logout Route
router.get('/logout', accountController.logoutUser);

//Sign up Route
router.get('/signup',  (req, res) => {
  res.render('signupform', {layout: 'main2'});
});

//Sign up POST
router.post('/signup', signupValidation, accountController.signupUser);


// Profile route
router.get('/profile', (req, res) => {

  res.render('profile', {
    title: 'profile'
   /* ,name: req.session.name,
    username: req.session.username,
    email: req.session.email,
    imagePath: req.session.imagePath */
  });
});


// Reservation status route
router.get('/status', reservationController.getStatus);


module.exports = router;
