const mongoose = require('./connection');

const villaSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    villatype: {type: String, required: true},
    price: {type: Number, required: true},
    capacity: {type: Number, required: true},
    rooms: {type: Number, required: true},
    imagePath: {type: String, required: true},
    shortDesc: {type: String, required: true},
    inclusions: [String],
    villageTheme: {type: String, required: true},
    village: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Village'
    },
    reservations: [
      {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Reservation'
      }
    ]
});


const villaModel = mongoose.model('Villa', villaSchema);

villaModel.getSpecific = function(query, sort, next){
  
  villaModel.find(query).sort(sort).exec(function(err, result) {
    
    var villaObjects = [];

    result.forEach(function(doc) {
      villaObjects.push(doc.toObject());
    });
    //console.log(villaObjects);
    next(villaObjects);
  });
}

module.exports = mongoose.model('Villa', villaSchema);