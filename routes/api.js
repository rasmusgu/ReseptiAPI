var express = require('express');
var router = express.Router();
const mysqlConnect = require("../mysqlConnect.js");

/* GET test page. */
router.get('/api', function(req, res, next) {
  res.send('This is the API');
});

router.get('/api/list', function(req, res, next){
  let result = mysqlConnect.reseptiLista();
  console.log(result);1
  res.json(JSON.parse(result);
})

module.exports = router;