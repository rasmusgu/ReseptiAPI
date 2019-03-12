var express = require('express'), bodyParser = require('body-parser');
var router = express.Router();
const mysqlConnect = require("../mysqlConnect.js");

router.get('/api', function(req, res, next) {
  res.send('ReseptiAPI');
});

router.get('/api/lista', function(req, res, next){
  mysqlConnect.reseptiLista(function(returnvalue){         //täytyy laittaa reseptilistalle parametrina funktio, minkä se osaa ajaa myöhemmin
    res.send(JSON.parse(returnvalue));
  })
});






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
    var aines = req.body.aines;

    mysqlConnect.syotaResepti(nimi, valmistusaika, kokkausohje, kuva, function (returnvalue) {

        if (returnvalue.warningStatus == 0) {
            res.sendStatus(200);
            mysqlConnect.getReseptiID(nimi, function(id){
                mysqlConnect.syotaAinesosa(aines,id,function(returnvalue){});
            });
        } else {
            res.sendStatus(500);
        }});
});


router.post('/api/haeReseptiById', function(req, res, next){
    if (req.header('Content-type') == "application/json") {
        var id = req.body.id;
        mysqlConnect.haeReseptiById(id, function (returnvalue) {
            console.log(returnvalue)

            res.send(JSON.parse(returnvalue));
        })
    } else res.sendStatus(406);

})




router.post('/api/haeReseptiById', function(req, res, next){
    var id = req.body.id;
    mysqlConnect.haeReseptiById(id, function(returnvalue) {
        res.send(JSON.parse(returnvalue));
    })
});


module.exports = router;