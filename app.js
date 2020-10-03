var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let hbs = require("hbs");
let cong=require('dotenv');
cong.config();

hbs.registerHelper("switch", (value,options)=>{
  this._switch_value_=value;
  // let html=options.fn(this);
  // delete this._switch_value_;
  // return html;
  return options.fn(this);
});

hbs.registerHelper("case",(value,options)=>{
  if (value==this._switch_value_){
    return options.fn(this);
  }
});

hbs.registerHelper('json',(value)=>{
  return JSON.stringify(value)
});

hbs.registerHelper('getname',(value)=>{
  return value[0].name;
});

hbs.registerHelper('gettitle',(value)=>{
  return value[0].title;
});

hbs.registerPartials(__dirname+"/views/partials")
hbs.registerPartials(__dirname+"/views/components")
hbs.registerPartials(__dirname+"/views/sistema")
hbs.registerPartials(__dirname+"/views/sistema/modal")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/pruebas", require('./routes/pruebas'))
app.use('/artistas', require('./routes/artist'))
app.use('/generos',require('./routes/genres'))
app.use('/contacto',require('./routes/contact'))
app.use('/discografia', require('./routes/discography'))
app.use('/login', require('./routes/login'))
app.use('/admin/sistema', require('./routes/sistema'))
app.use('/probando', require('./routes/probando'))
app.use('/downloads',require('./routes/downloads'))
app.use('/noticias',require("./routes/news"))
app.use('/admin/crud', require('./routes/crudAAN/crudAAN'));
app.use('/sistema/config/start',require('./routes/startsystem'));
app.use('/busqueda',require("./routes/result"));

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
