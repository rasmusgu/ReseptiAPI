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
                    callback(alteredresult)
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
            conn.query('SELECT * FROM reseptit WHERE nimi LIKE "%'+reseptinNimi+'%";')//?;',[reseptinNimi]) // Execute a query
                .then(result => { // Print the results
                    var alteredresult  = JSON.stringify(result); // turns the mysql query result into string
                    console.log("Haettu resepti: " +alteredresult);

                    callback(alteredresult)
                })
                .then(conn.destroy()) // Close the connection
        })
}

function ainesosaHaku(callback) {
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
                    var alteredresult  = JSON.stringify(result); // turns the mysql query result into string
                    console.log("Haettu resepti: " +alteredresult);

                    callback(alteredresult)
                })
                .then(conn.destroy()) // Close the connection
        })
}

function syotaResepti(nimi, valmistusaika, kokkausohje, kuva) {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('INSERT INTO reseptit(nimi, valmistusaika, kokkausohje, kuva) VALUES("'+nimi+'", '+valmistusaika+', "'+kokkausohje+', "'+kuva+'")') // Execute a query
                .then(conn.destroy()) // Close the connection
        })
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

function getReseptiID(reseptiNimi, callback){
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Choose database
            conn.query('SELECT id FROM TABLE reseptit WHERE nimi='+reseptiNimi+';') // Execute query
                .then(result => { // Print the resultsr
                    var alteredresult  = JSON.stringify(result); // turns the mysql query result into string
                    console.log("Haettu reseptiID: " +alteredresult);

                    callback(alteredresult)
                })
                    .then(conn.destroy()) // Close the connection
        })
}

mysqlConnectionTest();
//reseptiJaAinesosaLista();
//reseptiLista();
reseptiHaku('puu');
syotaResepti("Tuliset tacot",25,"Paista jauheliha, aseta tacojen sisään/päälle ja kaada päälle tulinen kastike.",);
syotaAinesosa("Kovakuorinen tortilla (Taco)",7);
syotaAinesosa("Tulinen kastike",7);
syotaAinesosa("Jauheliha",7);

// export functions
module.exports.reseptiLista = reseptiLista;
module.exports.reseptiHaku = reseptiHaku;