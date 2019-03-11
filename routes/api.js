var express = require('express'), bodyParser = require('body-parser');
var router = express.Router();
const mysqlConnect = require("../mysqlConnect.js");

/* GET test page. */
router.get('/api', function(req, res, next) {
  res.send('This is the API');
});

router.get('/api/lista', function(req, res, next){

  mysqlConnect.reseptiLista(function(returnvalue){         //täytyy laittaa reseptilistalle parametrina funktio, minkä se osaa ajaa myöhemmin
    //console.log(returnvalue)
    res.send(JSON.parse(returnvalue));
  })

})





router.post('/api/haeResepti', function(req, res){
    var recipe = req.body.haku;


    //console.log(req.body.haku);
        if (req.header('Content-type') == "application/json") {                                                  //katso tuleeko requestissa application:json headeri
            mysqlConnect.reseptiHaku(recipe, function (returnvalue) {
                //console.log(returnvalue)
                res.send(JSON.parse(returnvalue));
            })
        }else res.sendStatus(406);
})


router.post('/api/lisaaResepti', function(req, res) {
    var nimi = req.body.nimi;
    var valmistusaika = req.body.valmistusaika;
    var kokkausohje= req.body.kokkausohje;
    var kuva = req.body.kuva;
    //console.log(req.body);
    if (nimi || valmistusaika || kokkausohje || kuva != null  ) {
         mysqlConnect.syotaResepti(nimi, valmistusaika, kokkausohje, kuva, function (returnvalue) {

        //console.log(returnvalue.warningStatus);

        if (returnvalue.warningStatus == 0) {
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
         })
    }
})


router.post('/api/haeReseptiById', function(req, res, next){
 //console.log(req.header('Content-type'));
    if (req.header('Content-type') == "application/json") {
        var id = req.body.id;
        mysqlConnect.haeReseptiById(id, function (returnvalue) {
            console.log(returnvalue)

            res.send(JSON.parse(returnvalue));
        })
    } else res.sendStatus(406);

})





module.exports = router;