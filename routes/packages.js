// const express = require('express');
// const router = express.Router();

/* GET users listing. */
module.exports = (app, configs) => {
  const { name, rootPath, componentName, scripts = [] } = configs;

  app.get(`${rootPath}*`, function(req, res) {
    res.render('pages/package', {
      title: name,
      basePath: rootPath || "",
      links: req.menu,
      componentName,
      scripts
    })
    // res.send('respond with a resource');
  });

  return app;
}
