const mongoose = require('mongoose');

/*
const databaseURL = "mongodb+srv://AdminUser:12345@s14-mp7-66gtx.mongodb.net/test?retryWrites=true&w=majority/villageDb";

const options = { useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false };

mongoose.connect(databaseURL, options);*/

/*
const URI = "mongodb+srv://AdminUser:12345@s14-mp7-66gtx.mongodb.net/test?retryWrites=true&w=majority/villageDb";

const connectDB  = async () =>
{
    await mongoose.connect(URI,
    {
      useUnifiedTopology:true,
      useNewUrlParser:true,
      useFindAndModify: false
    });
  console.log("db connected...");
}

module.exports =connectDB; */
// ^^^ DOESN'T WORK
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://AdminUser:12345>@s14-mp7-66gtx.mongodb.net/test?retryWrites=true&w=majority/villageDB";

MongoClient.connect(uri,{useNewUrlParser:true}, function(err,client){
  console.log("connected");

});

//require("../models/seeder"); 

module.exports = mongoose;
