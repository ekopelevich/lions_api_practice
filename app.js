var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var lions = require('./routes/lions');
var hbs = require('express-hbs');
// var tigers = require('./routes/tigers');
var supertest = require('supertest');

var app = express();

app.engine('hbs', hbs.express4({partialsDir: __dirname + '/views/partials'}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/lions', lions);
// app.use('/tigers', tigers);

app.listen(3000, function(){
  console.log("Listening on Port 3000");
});

module.exports = app;
