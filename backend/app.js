const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const Keycloak = require('keycloak-connect');

// Instantiate Keycloak
const keycloakConfig = require('./config/keycloak.config.json');

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);


// Import routes
const index = require('./routes/index.controller');
const locations = require('./routes/locations.controller');
const movies = require('./routes/movies.controller');
const series = require('./routes/series.controller');
const commands = require('./routes/commands.controller');

// Config file
const config = require('./config/server.config.json');

const version = config.server.version || 1;

const app = express();

// session
app.use(session({
  secret: config.secretKey,
  resave: false,
  saveUninitialized: true,
  store: memoryStore,
}));

const router = express.Router();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(keycloak.middleware({
  logout: 'logout',
  admin: '/',
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  next();
});

// set base route to access API
app.use(`/api/v${version}`, router);


// register routes to use
router.use('/', index);
router.use('/locations', keycloak.enforcer(['resource:view', 'resource:write']), locations);
router.use('/movies', keycloak.enforcer(['resource:view', 'resource:write']), movies);
router.use('/series', keycloak.enforcer(['resource:view', 'resource:write']), series);
router.use('/commands', keycloak.enforcer(['resource:view', 'resource:write']), commands);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err.message);
});

module.exports = app;
