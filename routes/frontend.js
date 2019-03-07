var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: 'frontend/'});
});

router.get('/reseptilista', function(req, res, next) {
  res.sendFile('reseptilista.html', {root: 'frontend/'});
});

router.get('/haku', function(req, res, next) {
  res.sendFile('haku.html', {root: 'frontend/'});
});

router.get('/lisaa', function(req, res, next) {
  res.sendFile('lisaa.html', {root: 'frontend/'});
});

module.exports = router;
