var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const sluchaczeRouter = require('./routes/sluchaczeRoute');
const rezerwacjeRouter = require('./routes/rezerwacjeRoute');
const koncertyRouter = require('./routes/koncertyRoute');
const galeriaRouter = require('./routes/galeriaRoute');
const historiaRouter = require('./routes/historiaRoute');
const lokalizacjeKoncertowRouter = require('./routes/lokalizacjeKoncertowRoute');
const videoRouter = require('./routes/videoRoute');
const authRouter = require('./routes/auth');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });



var app = express();

app.use(session({
  secret: 'super mega secret',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  res.locals.user = req.session.user || null;
  res.locals.flashMessage = req.session.flashMessage || null;
  res.locals.clearFlashMessage = () => {req.session.flashMessage = null;}
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sluchacze', sluchaczeRouter);
app.use('/rezerwacje', rezerwacjeRouter);
app.use('/koncerty', koncertyRouter);
app.use('/galeria', galeriaRouter);
app.use('/historia', historiaRouter);
app.use('/lokalizacjeKoncertow', lokalizacjeKoncertowRouter);
app.use('/video', videoRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
