var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var transactionRouter = require("./routes/transaction")
var landRouter = require("./routes/lands")
var app = express();
const cors =require("cors");


// DB Connection

const mongoose =require("mongoose");

app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/lands', landRouter);
app.use('/transaction', transactionRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

mongoose.connect("mongodb+srv://razu:munna707@now-tori.czeyd.mongodb.net/agro",{ useUnifiedTopology: true,useNewUrlParser: true })
.then((err,data)=>{
  if(err){
  }
  console.log("DB connected")
})


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    status:false,
    message:err.message
  });
});

module.exports = app;
