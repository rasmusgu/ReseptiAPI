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
            mysqlConnect.haeReseptiId(nimi, function(id){
                // creates a new string starting from the 7th character of the old string
                // removing [{"id": from the string allowing us to parse the id below
                var substractedIdString = id.substr(7)

                // parses the first numerical value from string into new variable
                var parsedId = parseInt(substractedIdString);

                // inserts the user inputted aines and id corresponding to recipe
                // to their respective mySQL table
                mysqlConnect.syotaAinesosa(aines,parsedId,function(returnvalue){});
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




router.post('/api/haeReseptiId', function(req, res, next){
    if (req.header('Content-type') == "application/json") {
        var nimi = req.body.nimi;
        mysqlConnect.haeReseptiId(nimi, function(returnvalue) {
            res.send(JSON.parse(returnvalue));
        })
    }
});


module.exports = router;