var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cookieParser = require('cookie-parser')
const redis = require('redis')
var session = require('express-session')
const RedisStore = require("connect-redis").default

// Initialize client.
let redisClient = redis.createClient()
redisClient.connect().catch(console.error)

// Initialize store.
let redisStore = new RedisStore({ host: '127.0.0.1', port: 6379, client: redisClient,ttl :  260}) 



var app = express();
app.use(async (req, res, next) => {
  // await redisClient.connect();

  req.client = redisClient;
  // await redisClient.disconnect();
  next()
})

app.use(cookieParser('F6F013A77DFB4C38DD90F9AF37FD289C24026936'))
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'F6F013A77DFB4C38DD90F9AF37FD289C24026936',
  store:redisStore,
  resave: true,
  maxAge: 3600000,
  saveUninitialized: false,
  expires: new Date(Date.now() + 3600000) ,

  cookie: { secure: false }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
