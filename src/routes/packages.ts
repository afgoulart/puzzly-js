// const express = require('express');
// const router = express.Router();

/* GET users listing. */
export default (app, configs) => {
  const { name, rootPath, componentName, basePath, scripts = [] } = configs;

  app.get(`${rootPath}*`, function (req, res, next) {
    res.render('pages/package', {
      title: name,
      basePath: basePath || '',
      links: req.menu,
      componentName,
      scripts,
    });
    // res.send('respond with a resource');
  });

  return app;
};
