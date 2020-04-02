const villageModel = require('../models/village');

exports.getAllVillages = function(req, res) {
    villageModel.getAll(function(villages) {
  
        res.render('home', {
            logo: 'img/villaMainLogo.png',
            homepic: 'img/home.jpg',
           villages: villages });      
    });
};