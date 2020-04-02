const villaModel = require('../models/villa');


exports.getAllVillas = function(req, res) {
    villaModel.getSpecific({villageTheme: 'siargao'}, {price: 1}, function(villas) {
        
        res.render('villa', {
            title: 'villas',
            villa: villas 
        });     
    });
};

exports.getAvailabilities = function(req, res) {
    query = {
        villageTheme: req.body.id
    };
   
    villaModel.getSpecific(query, {price: 1}, function(villas) {
  
            res.render('availabilities', {
                title: 'availabilities',
                villa: villas
            });     
    });
};