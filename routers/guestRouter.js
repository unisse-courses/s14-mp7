const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const reservationController = require('../controllers/reservationController');
const { signupValidation, loginValidation } = require('../validators.js');
const { isLoggedOut, isLoggedIn } = require('../middlewares/checkAuth');


// Login Route
router.get('/login',  isLoggedOut, (req, res) => {
  res.render('loginform', {layout: 'main2'})
});


// Login POST
router.post('/login', isLoggedOut, loginValidation, accountController.loginUser);

// Logout Route
router.get('/logout', isLoggedIn, accountController.logoutUser);

//Sign up Route
router.get('/signup',  isLoggedOut, (req, res) => {
  res.render('signupform', {layout: 'main2'});
});

//Sign up POST
router.post('/signup', isLoggedOut, signupValidation, accountController.signupUser);

// Profile route
router.get('/profile', isLoggedIn, reservationController.getStatus);

// Profile POST
router.post('/cancel', isLoggedIn, reservationController.cancelReservation);

module.exports = router;
