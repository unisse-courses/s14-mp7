const mongoose = require('mongoose');
//const databaseURL = 'mongodb+srv://admin:admin@ccapdev-4kkwb.gcp.mongodb.net/s14mp7db';
//for testing, change to local first
//const databaseURL = 'mongodb://localhost:27017/s14mp7db';

const { dbURL } = require('../config');

// CHANGE THE LINK IN .ENV FILE IF MONGODB ATLAS >>const databaseURL = 'mongodb://localhost:27017/villalaisladb';
const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(dbURL, options);

module.exports = mongoose;
