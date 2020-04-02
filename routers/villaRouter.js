const express = require('express');
const router = express.Router();
const villaController = require('../controllers/villaController');
var village = 'siargao';


// Siargao Village route
router.get('/siargao', function(req, res) {
  res.render('siargao', {
    title: 'siargao village',
  });
});

/*
router.post('/siargao', function(req, res) {
  var id = req.body.id;
  village = 'siargao';
  res.redirect('/'+id +'-villas');
}); */


// Mykonos Village route
router.get('/mykonos', function(req, res) {
  res.render('Mykonos', {
      title: 'mykonos village',
  })
});

/*
router.post('/mykonos', function(req, res) {
  var id = req.body.id;
  village = 'mykonos';
  res.redirect('/availabilities');
}); */


  
// Toscana Village route
router.get('/toscana', function(req, res) {
  res.render('toscana', {
      title: 'toscana village',
  })
});

/*
router.post('/toscana', function(req, res) {
  var id = req.body.id;
  village = 'toscana';
  res.redirect('//availabilities');
}); */

// Villa route
router.get('/villa', villaController.getAllVillas);

// Availabilities route
router.get('/availabilities', function(req, res) {
      res.render('availabilities', {
        title: 'availabilities'
    });  
});

router.post('/availabilities', villaController.getAvailabilities);

module.exports = router;
