var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require("mongoose");
require("./models/userModel");
require("./models/cateModel");
require("./models/productModel");
require("./models/studentModel");
require("./models/tinhModel");

var indexRouter = require('./routes/index');//dan toi file 
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product');
var studentRouter = require('./routes/student');
var tinhRouter = require('./routes/tinh');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//connect database //localhost:27017/md19302
//mongodb+srv://minhanhdang511:zzokLAdajSDcuEIP@cluster0.dji4o.mongodb.net/
mongoose.connect('mongodb+srv://minhanhdang511:zzokLAdajSDcuEIP@cluster0.dji4o.mongodb.net/MD19302') //connection string
  .then(() => console.log('>>>>>>>>>> DB Connected!!!!!!'))
  .catch(err => console.log('>>>>>>>>>> DB Error', err));

//locahost:3000/users
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);
app.use('/student', studentRouter);
app.use('/tinh', tinhRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
