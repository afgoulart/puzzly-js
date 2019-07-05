var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Puzzly JS',
    basePath: "/",
    links: req.menu
  });
});

module.exports = router;
