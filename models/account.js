const mongoose = require('./connection');

const accountSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true, min: 3, max: 100},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, required: true},
    imagePath: {type: String, required: true}
});


const accountModel = mongoose.model('Account', accountSchema);

accountModel.create = function(obj, next) {
    const Account = new accountModel(obj);
  
    Account.save(function(err, Account) {
      next(err, Account);
    });
  };

accountModel.getUser = function(query, next){

  accountModel.findOne(query).exec(function(err, Account) {
      if (err) throw err;

      next(err, Account);
  });

}

accountModel.updateUser = function(query, update, next){
  accountModel.updateOne(query, update, function(err, result) {
      next(err, result);
  });
};

module.exports = mongoose.model('Account', accountSchema);
