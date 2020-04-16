const mongoose = require('mongoose');
const databaseURL = 'mongodb+srv://admin:admin@ccapdev-4kkwb.gcp.mongodb.net/s14mp7db';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);

module.exports = mongoose;
