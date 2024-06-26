var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan'); // Importar morgan
var logger = require('./logger'); // Atualizado para usar o logger personalizado

const indexRouter = require('./routes/index');
const usuariosRouter = require('./routes/usuarios');
const produtosRouter = require('./routes/produtos');
const clientesRouter = require('./routes/clientes');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');

var app = express();

const dotenv = require('dotenv');
dotenv.config();
console.log(process.env.MYSQL_DB);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev')); // Usar morgan para logs HTTP
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/clientes', clientesRouter);
app.use('/produtos', produtosRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

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
