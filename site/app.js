var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const crypto = require('crypto');

var cadastroRouter = require('./routes/cadastro');
var db_reqRouter = require('./routes/db_requests');
var loginRouter = require('./routes/login')
var lojaRouter = require('./routes/loja')
var inicialRouter = require('./routes/inicial');

var app = express();

// Gerar uma secret key aleatória de 32 bytes (256 bits)
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Secret key:', secretKey);

// Configuração do express-session
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', cadastroRouter);
app.use('/', db_reqRouter);
app.use('/', loginRouter );
app.use('/', lojaRouter);
app.use('/', inicialRouter);

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
