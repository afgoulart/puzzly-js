var createError = require('http-errors');
var express = require('express');
var engine = require('ejs-locals')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var packagesRouter = require('./routes/packages');
var Auth = require('./middlewares/auth')

var app = express();


module.exports = (allconfigs = {}) => {
  app.engine('ejs', engine);

  const menu = allconfigs.routes;
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(function(req, res, next) {
    req.menu = menu;
    next()
  });

  app.use(Auth)
  
  
  app.use('/', Auth, indexRouter);
  
  /**
   * Configuring packages router
   */
  const packagesKeys = Object.keys(allconfigs.packages);
  packagesKeys.map(p => {
    const pkg = allconfigs.packages[p];
    packagesRouter(app, pkg);
  })
  // catch 404 and forward to error handler
  // app.use(function (req, res, next) {
  //   next(createError(404));
  // });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('pages/error');
  });

  return app;
}
