var express = require('express');
var router = express.Router();

/* GET test page. */
router.get('/api', function(req, res, next) {
  res.send('This is the API');
});

module.exports = router;
