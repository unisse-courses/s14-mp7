const mongoose = require('./connection');

const villageSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    theme: {type: String, required: true},
    desc: {type: String, required: true},
    imagePath: {type: String, required: true}
});


const villageModel = mongoose.model('Village', villageSchema);


exports.getAll = function(next){
  
  villageModel.find({}).exec(function(err, result) {
    var villageObjects = [];

    result.forEach(function(doc) {
      villageObjects.push(doc.toObject());
    });

    next(villageObjects);
  });
}

