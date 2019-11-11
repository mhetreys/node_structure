var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
const dbConst = require('./config/database.const.js');
global.__basedir = __dirname;
mongoose.Promise = global.Promise;


app.use(function (req, resp, next) {
    resp.header('Access-Control-Allow-Origin', "*");
    resp.header('Access-Control-Allow-Methods', 'GET,POST,PUT,HEAD,DELETE,OPTIONS');
    resp.header('Access-Control-Allow-Headers', 'content-Type,x-requested-with,beartoken,authtoken');
    next();
});

//to parse xwww calls
app.use(bodyParser.urlencoded({extended: true}));
//to parse json calls
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var port = process.env.PORT || 8900;
require('./app/index')(app);

mongoose.connect(dbConst.MONGOURL, {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => {
    console.log("Successfully connected to the database Mongo 111");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...',err);
});


process
  .on("unhandledRejection", (reason, p) => {
    //console.log(reason, "Unhandled Rejection at Promise", p);
    //logger.error("unhandledRejection", reason);
  })
  .on("uncaughtException", err => {
    //console.error(err, "Uncaught Exception thrown");
    //logger.error("Uncaught Exception thrown !!!", err);
  });


var serverObj = app.listen(port);
serverObj.timeout = 30000;
console.log('jdmail started on port ' + port);

