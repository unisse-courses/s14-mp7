const mongoose = require('mongoose');
/*
const databaseURL = 'mongodb://localhost:27017/villadb';

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options); */



const URI = "mongodb+srv://AdminUser:12345@s14-mp7-66gtx.mongodb.net/test?retryWrites=true&w=majority";

const connectDB  = async () =>
{
    await mongoose.connect(URI,
    {
      useUnifiedTopology:true,
      useNewUrlParser:true
    });
  console.log("db connected...");
}

module.exports =connectDB;
module.exports = mongoose;
