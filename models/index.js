require("dotenv").load();
const mongoose = require('mongoose');
// To view mongo quesries being run, on the terminal
mongoose.set("debug", true);
// Promise library
mongoose.Promise = Promise;
// Connect to mongodb
mongoose.connect(
  process.env.MONGODB_URI ||
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds047085.mlab.com:47085/twatter` ||
    "mongodb://localhost/twatter",
  {
    // To keep connection open
    keepAlive: true,
    useNewUrlParser: true
  }
);

// idea of bundling
module.exports.User = require('./user')
module.exports.Message = require('./message')