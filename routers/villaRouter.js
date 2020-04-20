const express = require('express');
const router = express.Router();
const villaController = require('../controllers/villaController');
const reservationController = require('../controllers/reservationController');
const { isLoggedOut, isLoggedIn } = require('../middlewares/checkAuth');

// Siargao Village route
router.get('/siargao', function(req, res) {
  res.render('siargao', {
    title: 'siargao village',
  });
});

// Mykonos Village route
router.get('/mykonos', function(req, res) {
  res.render('Mykonos', {
      title: 'mykonos village',
  })
});

// Toscana Village route
router.get('/toscana', function(req, res) {
  res.render('toscana', {
      title: 'toscana village',
  })
});

// Villa route
router.get('/villa', villaController.getAllVillas);


// Availabilities route
router.get('/availabilities', isLoggedIn, function(req, res) {
      res.render('availabilities', {
        title: 'availabilities'
    });
});

router.post('/availabilities', villaController.getAvailabilities);

router.post('/reserve', reservationController.getReservation);

module.exports = router;
