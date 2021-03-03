import createError from 'http-errors';
import express, { Request } from 'express';
import engine from 'ejs-locals';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import serveIndex from 'serve-index';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import packagesRouter from './routes/packages';

const app = express();

module.exports = (allconfigs: any = {}) => {
  app.engine('ejs', engine);

  const menu = allconfigs.routes;
  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(
    '/packages',
    express.static('packages'),
    serveIndex('public/files', { icons: true })
  );

  app.use((req: any, _res, next) => {
    req.menu = menu;
    next();
  });

  app.use('/', indexRouter);
  app.use('/user', usersRouter);

  /**
   * Configuring packages router
   */
  const packagesKeys = Object.keys(allconfigs.packages);
  packagesKeys.map((p) => {
    const pkg = allconfigs.packages[p];
    packagesRouter(app, pkg);
  });

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
};
