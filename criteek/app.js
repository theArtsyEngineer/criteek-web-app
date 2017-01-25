var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressHbs = require('express-handlebars');
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport"); //user login, authenticate, etc.
var flash = require("connect-flash");
var validator = require('express-validator');
var mongoStore = require('connect-mongo')(session);
var multer = require("multer");
var Grid = require('gridfs-stream');
var injector = require('express-script-injector');

Grid.mongo = mongoose.mongo;

var app = express();

var routes = require('./routes/index');
var userRoutes = require('./routes/user');
var imgUp = require('./routes/imgUpload');
var postCrit = require('./routes/postCrit');

mongoose.connect('localhost:27017/criteek');
require("./config/passport");

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout:'layout', extname:'.hbs'}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'huron123key',
  resave: false, 
  saveUninitialized: false,
  store: new mongoStore({mongooseConnection: mongoose.connection}),
  cookie: {maxAge: 360 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(multer({dest:'./uploads/'}).single('photo'));
app.use(injector({path: __dirname + '/public/javascripts', script: 'modalHandle.js'}));

app.use(function(req,res,next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use('/user', userRoutes);
app.use('/', routes);
app.use('/', imgUp);
app.use('/', postCrit);

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
