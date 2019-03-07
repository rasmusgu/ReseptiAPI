var express = require('express');
var router = express.Router();
const mysqlConnect = require("../mysqlConnect.js");

/* GET test page. */
router.get('/api', function(req, res, next) {
  res.send('This is the API');
});

router.get('/api/list', function(req, res, next){

  mysqlConnect.reseptiLista(function(returnvalue){         //täytyy laittaa reseptilistalle parametrina funktio, minkä se osaa ajaa myöhemmin
    console.log(returnvalue)
    res.send(JSON.parse(returnvalue));
  })

})


module.exports = router;