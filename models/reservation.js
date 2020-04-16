const mongoose = require('./connection');

const reservationSchema = new mongoose.Schema({
    account: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account'
    },
    checkIn: {type:Date, required: true},
    checkOut: {type: Date, required: true},
    adultNum: {type: String, required: true},
    childrenNum: {type: String, required: true},
    villa: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Villa'
    },
    total: {type: Number, required: true},
    status: {type: String, 
            required: true, 
            enum: ['Active', 'Cancelled', 'Completed'], 
            default: 'Active'}
});


const reservationModel = mongoose.model('Reservation', reservationSchema);

reservationModel.getAll = function(sort, next){
    reservationModel.find({}).populate('account').populate('villa').exec(function(err, result) {
        var reservationObjects = [];

        result.forEach(function(doc) {
        reservationObjects.push(doc.toObject());
        });
       // console.log(reservationObjects);
        next(reservationObjects);
    }); 
}  

reservationModel.getSpecific = function(query, next){
    reservationModel.find(query).populate('account').populate('villa').exec(function(err, result) {
        var reservationObjects = [];

        result.forEach(function(doc) {
        reservationObjects.push(doc.toObject());
        });
        //console.log(reservationObjects);
        next(reservationObjects);
    }); 
} 

module.exports = mongoose.model('Reservation', reservationSchema);