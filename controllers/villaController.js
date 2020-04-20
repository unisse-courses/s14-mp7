const villaModel = require('../models/villa');


exports.getAllVillas = function(req, res) {
    villaModel.getSpecific({villageTheme: 'siargao'}, {price: 1}, function(err, villas) {
        
        res.render('villa', {
            title: 'villas',
            villa: villas 
        });     
    });
};

exports.getAvailabilities = function(req, res) {
    query = {
        villageTheme: req.body.villageTheme,
        capacity: { $gte: req.body.pax } 
    };
    
    villaModel.getSpecific(query, {price: 1}, function(err, villas) {
        if (err) {
            console.log(err.errors);
        } else {
            console.log("Successfully found villas!");
            // console.log(villas);

            res.send(villas);
        }     
    });
};