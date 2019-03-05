var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/', function(req, res, next) {
  res.sendfile('index.html');
});

module.exports = router;
