const express = require('express');
const router = express.Router();

// Importing the controller
const amenityController = require('../controllers/amenityController');
const villageController = require('../controllers/villageController');



// Home route
router.get('/', villageController.getAllVillages);


// About route
router.get('/about', function(req, res) {
  res.render('about', {
      title: 'the resort'
  })
});


// Amenities route
router.get('/amenities', amenityController.getAllAmenities);

module.exports = router; 
