const amenityModel = require('../models/amenity');

exports.getAllAmenities = function(req, res) {
    amenityModel.getAll({name: 1}, function(amenities) {
  
    res.render('amenities', {
        title: 'amenities',
        amenities: amenities });
    });
};