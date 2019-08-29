const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const favicon = require('serve-favicon');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/customers');
const luckyRouter = require('./routes/lucky');
const searchRouter = require('./routes/search');



const app = express();

mongoose.connect('mongodb://localhost/CarsAB',{
  useNewUrlParser: true
});

mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.use(
    session({
      store: new MongoStore({mongooseConnection: db}),
      name: 'sid',
      saveUninitialized: false,
      resave: false,
      secret: 'Hkjhsdf837/7392//8%2bnsdjh2"',
      cookie: {
        // 2 hours
        maxAge: 1000 * 60 * 60 * 2,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production'
      }
    })
);

app.use(favicon(__dirname + '/public/images/favicon.ico'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', usersRouter);
app.use('/lucky', luckyRouter);
app.use('/search', searchRouter);


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
