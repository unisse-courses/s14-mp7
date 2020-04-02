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

exports.create = function(obj, next) {
    const Account = new accountModel(obj);
  
    Account.save(function(err, Account) {
      next(err, Account);
    });
  };

exports.getUser = function(query, next){

    accountModel.findOne(query).exec(function(err, Account) {
        if (err) throw err;

        next(err, Account);
    });
  
}

