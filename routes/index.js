var express = require('express');
var router = express.Router();

/* GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ReseptiAPI' });
});/

/* GET test page. */
router.get('/rasse', function(req, res, next) {
  res.sendfile('rasse.html');
});

module.exports = router;
