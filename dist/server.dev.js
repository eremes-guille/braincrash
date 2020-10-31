"use strict";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var express = require('express');

var app = express();

var expressLayouts = require('express-ejs-layouts');

var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');

var authorRouter = require('./routes/authors');

var bookRouter = require('./routes/books');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(express["static"]('public'));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));

var mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', function (error) {
  return console.error(error);
});
db.once('open', function () {
  return console.log('Connected to Mongoose');
});
app.use('/', indexRouter);
app.use('/authors', authorRouter);
app.use('/books', bookRouter);
app.listen(process.env.PORT || 3000);