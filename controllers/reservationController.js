const moment = require('moment');
const reservationModel = require('../models/reservation');

exports.getAllReservations = function(req, res) {

    //get date today
    var dateToday = new Date();
    var offset = dateToday.getTimezoneOffset() / 60;
    var hours = dateToday.getHours();
    dateToday.setHours(hours - offset);

    var query = { 
          status: "Active",
          checkOut: { "$lte": dateToday }
    };
    update = { 
          "$set": { status: "Completed" }
    };

    //update all reservations first
    reservationModel.updateReservations(query, update, function(err, reservations) {
      if (err) throw err;
    }); 

    reservationModel.getAll({checkOut:1}, function(err, reservations) {
  
        res.render('reservations', {
            title: 'reservations report',
            reservations: reservations
          });    
    });
};

exports.getAvailabilities = function(req, res) {

  reservationModel.getAll({checkOut:1}, function(err, reservations) {

      res.send(reservations);  
  });
};

exports.getStatus = function(req, res) {
      

      //get date today
      var dateToday = new Date();
      var offset = dateToday.getTimezoneOffset() / 60;
      var hours = dateToday.getHours();
      dateToday.setHours(hours - offset);
      console.log(dateToday);

      var status = { 
            status: "Active",
            checkOut: { "$lte": dateToday }
      };
      update = { 
            "$set": { status: "Completed" }
      };

      //update all reservations first
      reservationModel.updateReservations(status, update, function(err, reservations) {
        if (err) throw err;
        console.log(reservations);
      }); 

      var account = {
        account: req.session.Account
      }; 

    reservationModel.getSpecific(account, {checkOut:1}, function(err, reservations) {
     
        res.render('profile', {
          title: 'profile',
          reservation: reservations,
          name: req.session.name,
          username: req.session.username,
          email: req.session.email,
          imagePath: req.session.imagePath 
        });
    });
};

exports.getReservation = function(req, res) {
    var checkInDate = new Date(req.body.checkIn);
    var checkOutDate = new Date(req.body.checkOut);
    var priceId = req.body.priceId;
    var totalNights =  parseInt((checkOutDate-checkInDate) / (24 * 3600 * 1000));
    var total = totalNights*priceId;

    var newReservation = {
      account: req.session.Account,                 
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      adultNum: req.body.adultNum,
      childrenNum: req.body.childrenNum,
      villa: req.body.villa,
      total: total,
      status: req.body.status
    };
    //console.log(newReservation);

  reservationModel.create(newReservation, function(err, reservation){
    var result;
      // edit this by handling errors
      if (err) {
        console.log(err.errors);

        result = { success: false, message: "Reservation was not created!" }
        res.send(result); 
      } else {
        console.log("Successfully added Reservation!");
        // console.log(reservation);
        
        result = { success: true, message: "Reservation created!", url:'/profile'}

        res.send(result);
        
      }
      
  });
 

};

exports.cancelReservation = function(req, res) {
  console.log("Reservation ID to cancel: " + req.body.reservationId);
  var id = req.body.reservationId;

  reservationModel.cancel(id, function(err){    
    if (err) throw err;
    console.log("Successfully cancelled Reservation!");
  }); 

  res.sendStatus(200);
}; 