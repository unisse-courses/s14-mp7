const mongoose = require('./connection');
const moment = require('moment');

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

reservationModel.getOccupied = function(query, next){
    reservationModel.find(query).populate('account').populate('villa').exec(function(err, result) {
        var reservationObjects = [];

        result.forEach(function(doc) {
        reservationObjects.push(doc.toObject());
        });

        for (var i=0; i<reservationObjects.length; i++) {
            reservationObjects[i].checkIn = moment(reservationObjects[i].checkIn).format('MM/DD/YYYY');
            reservationObjects[i].checkOut = moment(reservationObjects[i].checkOut).format('MM/DD/YYYY');
        }
        //console.log(reservationObjects);
        next(err,reservationObjects);
    }); 
}  

reservationModel.getAll = function(sort, next){
    reservationModel.find({}).sort(sort).populate('account').populate('villa').exec(function(err, result) {
        var reservationObjects = [];

        result.forEach(function(doc) {
        reservationObjects.push(doc.toObject());
        });

        for (var i=0; i<reservationObjects.length; i++) {
            reservationObjects[i].checkIn = moment(reservationObjects[i].checkIn).format('MM/DD/YYYY');
            reservationObjects[i].checkOut = moment(reservationObjects[i].checkOut).format('MM/DD/YYYY');
        }
       // console.log(reservationObjects);
        next(err,reservationObjects);
    }); 
}  

reservationModel.getSpecific = function(query, sort, next){
    reservationModel.find(query).sort(sort).populate('account').populate('villa').exec(function(err, result) {
        var reservationObjects = [];

        result.forEach(function(doc) {
        reservationObjects.push(doc.toObject());
        });

        for (var i=0; i<reservationObjects.length; i++) {
            reservationObjects[i].checkIn = moment(reservationObjects[i].checkIn).format('MM/DD/YYYY');
            reservationObjects[i].checkOut = moment(reservationObjects[i].checkOut).format('MM/DD/YYYY');
        }
        //console.log(reservationObjects);
        next(err, reservationObjects);
    }); 
} 

reservationModel.create = function(obj, next) {
    const reservation = new reservationModel(obj);
  
    reservation.save(function(err, reservation) {
      next(err, reservation);
    });
  };

reservationModel.updateReservations = function(query, update, next){
    reservationModel.updateMany(query, update, function(err, result) {
        next(err, result);
    });
};

reservationModel.cancel = function(query, next){
    reservationModel.findByIdAndRemove(query, function(err) {
        next(err);
    });
};

module.exports = mongoose.model('Reservation', reservationSchema);