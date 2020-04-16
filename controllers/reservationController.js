const reservationModel = require('../models/reservation');

exports.getAllReservations = function(req, res) {
    reservationModel.getAll({name:1},function(reservations) {
  
        res.render('reservations', {
            title: 'reservations report',
            reservations: reservations
          });    
    });
};

exports.getStatus = function(req, res) {
    /*var query = {
        name: req.session.username
      }; */
      var query = {
        account: '5e9867e25a56c971fc117c7f'
      }; 

    reservationModel.getSpecific(query, function(reservations) {
  
        res.render('status', {
            title: 'status',
            reservation: reservations,
            username: req.session.username
          });    
    });
};