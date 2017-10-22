var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var locations = require('./routes/locations');
var movies = require('./routes/movies');
var series = require('./routes/series');
var commands = require('./routes/commands');

var users = require('./routes/users');

var list = require('./routes/list');
var add = require('./routes/add');
var modify = require('./routes/modify');
var remove = require('./routes/remove');
var stats = require('./routes/stats');
var test = require('./routes/test');

var app = express();

var router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

//set base route to access API
app.use('/api/v2', router);


// register routes to use
router.use('/', index);
router.use('/locations', locations);
router.use('/movies', movies);
router.use('/series', series);
router.use('/commands', commands);

app.use('/users', users);
app.use('/list', list);
app.use('/add', add);
app.use('/modify', modify);
app.use('/remove', remove);
app.use('/stats', stats);
app.use('/test', test);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
