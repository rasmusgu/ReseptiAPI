var express = require('express'), bodyParser = require('body-parser');
var router = express.Router();
const mysqlConnect = require("../mysqlConnect.js");

/* GET test page. */
router.get('/api', function(req, res, next) {
  res.send('This is the API');
});

router.get('/api/lista', function(req, res, next){

  mysqlConnect.reseptiLista(function(returnvalue){         //täytyy laittaa reseptilistalle parametrina funktio, minkä se osaa ajaa myöhemmin
    console.log(returnvalue)
    res.send(JSON.parse(returnvalue));
  })

})

router.post('/api/haeResepti', function(req, res){
    var recipe = req.body.haku;

    console.log(req.body.haku);



    mysqlConnect.reseptiHaku(recipe, function(returnvalue){
      console.log(returnvalue)
      res.send(JSON.parse(returnvalue));
    })
})

router.post('/api/lisaaResepti', function(req, res){
    var nimi = req.body.nimi;
    var valmistusaika = req.body.valmistusaika;
    var kokkausohje= req.body.kokkausohje;
    var kuva = req.body.kuva;
    console.log(req.body);

    /*var nimi = "kalakeitto";
    var valmistusaika = 15;
    var kokkausohje= "lisaa kalat ja keitto";
    var kuva = "";
    */

    mysqlConnect.syotaResepti(nimi, valmistusaika, kokkausohje, kuva , function(returnvalue){

        console.log(returnvalue);
        res.send(JSON.parse(returnvalue));
    })
})



module.exports = router;