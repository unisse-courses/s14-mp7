const mongoose = require('./connection');

const amenitySchema = new mongoose.Schema({
    name: {type: String, required: true},
    imagePath: {type: String, required: true},
    description: {type: String, required: true}
});


const amenityModel = mongoose.model('Amenity', amenitySchema);


exports.getAll = function(sort, next){

  amenityModel.find({}).sort(sort).exec(function(err, result) {
    if (err) throw err;
    var amenityObjects = [];
  
    result.forEach(function(doc) {
      amenityObjects.push(doc.toObject());
    });
  
    next(amenityObjects);
  });

}




