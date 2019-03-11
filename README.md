A simple API to add and read recipes

Sallitut HTTP requestit
    GET
    POST
 
 
    
Hae kaikki reseptit
  GET  /api/lista
  palauttaa listan kaikista resepteistä
  Esimerkki responsesta:
    
        [
            {
                "id": 1,
                "nimi": "Pasta bolognese\r\n",
                "valmistusaika": 45,
                "kokkausohje": "Keitä pastat",
                "kuva": "https://www.recipetineats.com/wp-content/uploads/2016/08/Spaghetti-Bolognese_3.jpg",
                "GROUP_CONCAT(a.`nimi` separator ', ')": "Tomaatti: 3"
            },
            {
                "id": 3,
                "nimi": "Puuro",
                "valmistusaika": 5,
                "kokkausohje": "Mikrota 5 minuuttia",
                "kuva": "https://static.independent.co.uk/s3fs-public/thumbnails/image/2013/10/10/17/38-porridge-ala.jpg",
                "GROUP_CONCAT(a.`nimi` separator ', ')": "Kaurahiutaleet: 2 dl"
            }
         ]
    
    

Hae reseptejä millä tahansa hakutermillä
    POST /api/haeResepti
    Content type täytyy olla "application/json" 
    Jsonin täytyy olla muodossa {"haku": "hakutermi" }
    esimerkkihaku:
    
         {"haku": "puuro" }

Hae reseptejä reseptin id:llä
   POST /api/haeReseptiById
   Content type täytyy olla "application/json" 
   Jsonin täytyy olla muodossa {"id": "idnumero" }
   
   esimerkkihaku:
        
             {"id: "1" }
             
             
Lisää reseptejä
    POST /api/lisaaResepti
    Content type täytyy olla "application/json" 
    
   esimerkkihaku:
            
            
                 {"nimi":"makaronilaatikko",
                 "valmistusaika":"45",
                 "kokkausohje":"paista jauheliha, lisää makaroni ja juusto, laita uuniin 45min",
                 "kuva":"https://www.myllynparas.fi/sites/default/files/thumbnails/image/1187088704_makaronilaatikko_4.jpg",
                 "aines":"jauheliha, makaroni, juusto"}