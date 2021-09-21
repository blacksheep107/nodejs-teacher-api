var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var accessRouter = require('./routes/accesse');
var queryRouter = require('./routes/query');
var addRouter = require('./routes/add');
var deleteRouter = require('./routes/delete');
var updateRouter = require('./routes/update');
var uploadfileRouter = require('./routes/uploadfile');
var fileurlRouter = require('./routes/fileurl');
var batchdownloadfileRouter = require('./routes/batchdownloadfile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.all('*',function (req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  // res.header('Content-Type', 'text/plain');
  res.header('Cache-Control', 'no-store');
  next();
})
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/cgi-bin/token', accessRouter);
app.use('/tcb/databasequery', queryRouter);
app.use('/tcb/databaseadd', addRouter);
app.use('/tcb/databasedelete', deleteRouter);
app.use('/tcb/databaseupdate', updateRouter);
app.use('/tcb/uploadfile', uploadfileRouter);
app.use('/fileurl', fileurlRouter);
app.use('/tcb/batchdownloadfile', batchdownloadfileRouter);

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
