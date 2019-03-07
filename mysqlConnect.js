var mariadb = require('mariadb');

function mysqlConnectionTest() {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('SELECT "mySQL connection succesful!" as my_message') // Execute a query
                .then(result => { // Print the results
                    for (row of result) {
                        console.log(row)
                    }
                })
                .then(conn.destroy()) // Close the connection
        })
}

function reseptiLista(callback) {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('SELECT * FROM reseptit')// Execute a query
                .then(result => {
                    var alteredresult  = JSON.stringify(result);
                        console.log("reseptilista " +alteredresult);
                    //}
                    callback(alteredresult)
                    //return alteredresult;
            })
                .then(conn.destroy()) // Close the connection
        })
}

function reseptiJaAinesosaLista(callback){
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // select database
            conn.query('SELECT * FROM reseptit LEFT JOIN ainesosat on reseptit.id = ainesosat.reseptiID;') // Execute a q
                .then(result => {
                    var alteredresult = JSON.stringify(result);
                    console.log("Resepti ja ainesosa lista: " +alteredresult);

                    callback(alteredresult)
                })
                .then(conn.destroy()) // Close the connection
        })
}

function reseptiHaku(reseptinNimi, callback) {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('SELECT * FROM reseptit WHERE nimi LIKE "%'+reseptinNimi+'%";')//,[reseptinNimi]) // Execute a query
                .then(result => { // Print the results
                    var alteredresult  = JSON.stringify(result); // turns the mysql query result into string
                    console.log("Haettu resepti: " +alteredresult);

                    callback(alteredresult)

                    //callback(JSON.stringify(result));
                    })

                .then(conn.destroy()) // Close the connection
            //return result

        })

}

function ainesosaHaku(reseptiId) {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('SELECT nimi FROM ainesosat WHERE reseptiID="'+reseptiId+'";') // Execute a query
                .then(result => { // Print the resultsr
                    for (row of result) {
                        console.log(row)
                    }
                })
                .then(conn.destroy()); // Close the connection
            return result
        })
}

function syotaResepti(nimi, valmistusaika, kokkausohje, kuva, callback) {
    console.log("syota resepti")
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('INSERT INTO reseptit(nimi, valmistusaika, kokkausohje, kuva) VALUES("'+nimi+'", '+valmistusaika+', "'+kokkausohje+'", "'+kuva+'")') // Execute a quer

            console.log("resepti lisätty");

            conn.destroy()
        }); // Close the connection


}



function syotaAinesosa(nimi, reseptiId) {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('INSERT INTO ainesosat(nimi, reseptiID) VALUES("'+nimi+'", '+reseptiId+')') // Execute a query
                .then(conn.destroy()) // Close the connection
        })
}

function getReseptiID(reseptiNimi){
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Choose database
            conn.query('SELECT id FROM TABLE reseptit WHERE nimi='+reseptiNimi+';') // Execute query
                .then(conn.destroy()) // Close the connection
        })
}

mysqlConnectionTest();
//reseptiJaAinesosaLista();
//reseptiLista();
//reseptiHaku('puu');
//syotaResepti("Siskonmakkara -keitto",95,"Pilko ainekset, keitä vesi ja laita pilkotut ainekset veteen.");
//syotaAinesosa("Siskonmakkara",6);
//syotaAinesosa("Peruna",6);
//syotaAinesosa("Porkkana",6);

module.exports.reseptiLista = reseptiLista;
module.exports.reseptiHaku = reseptiHaku;
module.exports.syotaResepti = syotaResepti;// export your functuion