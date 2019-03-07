var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', {root: 'frontend/'});
});

router.get('/reseptilista', function(req, res, next) {
  res.sendFile('reseptilista.html', {root: 'frontend/'});
});

module.exports = router;
