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
            conn.query('use reseptiapi') // select database
            // reseptilista + ainesosat
            conn.query("SELECT r.`id`, r.`nimi`, r.`valmistusaika`, r.`kokkausohje`, r.`kuva`,  GROUP_CONCAT(a.`nimi` separator ', ') FROM `reseptit` r LEFT JOIN `ainesosat` a on a.`reseptiID` = r.`id` GROUP BY r.`id`, r.`nimi`;")
            // perus reseptilista
            //conn.query('SELECT * FROM reseptit')
                .then(result => {
                    var alteredresult  = JSON.stringify(result);
                    //console.log("Reseptilista: " +alteredresult);
                    if (callback) {
                        callback(alteredresult);
                    }
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
                    //console.log("Resepti- ja ainesosalista: " +alteredresult);
                    if (callback) {
                        callback(alteredresult);
                    }
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
                    //console.log("Haettu resepti: " +alteredresult);
                    if (callback) {
                        callback(alteredresult);
                    }
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
                    //console.log("Haettu ainesosa: " +alteredresult);
                    if (callback) {
                        callback(alteredresult);
                    }
                })
                .then(conn.destroy()); // Close the connection
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
            conn.query('use reseptiapi') // Execute a query
            conn.query('INSERT INTO reseptit(nimi, valmistusaika, kokkausohje, kuva) VALUES("'+nimi+'", '+valmistusaika+', "'+kokkausohje+'", "'+kuva+'")') // Execute a quer
            //console.log("Reseptin ID: ");
            conn.destroy()
        }); // Close the connection
}

function haeReseptiById(id, callback) {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // select database
            //conn.query("SELECT * FROM reseptit WHERE id='"+id+"';") // searches recipe based on id
            conn.query("SELECT r.`id`, r.`nimi`, r.`valmistusaika`, r.`kokkausohje`, r.`kuva`,  GROUP_CONCAT(a.`nimi` separator ', ') FROM `reseptit` r LEFT JOIN `ainesosat` a ON a.`reseptiID`=r.`id` WHERE r.`id`=? GROUP BY r.`id`, r.`nimi`;",[id])
                /*.then(result => {
                    var alteredresult  = JSON.stringify(result);
                    console.log("Reseptilista: " +alteredresult);
                    if (callback) {
                        callback(alteredresult);
                    }
                    */
                .then(result => { // Print the results
                    var alteredresult  = JSON.stringify(result); // turns the mysql query result into string
                    //console.log("Haettu resepti: " +alteredresult);
                    if (callback) {
                        callback(alteredresult);
                    }
                })
                .then(conn.destroy()) // Close the connection
                /*
                .then((res) => {
                    result = res;
                    console.log(result);
                    conn.end();
                    callback && callback(result)
                })
                .catch(err => {
                    //handle error
                    result = err;
                    console.log(result);
                    conn.end();
                    callback && callback(result)
                })
                */
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
            conn.query('use reseptiapi') // Choose database
            conn.query('INSERT INTO ainesosat(nimi, reseptiID) VALUES("'+nimi+'",'+reseptiId+');') // Execute query
                .catch(err => {
                    //handle error
                    //console.log("Syötetty ainesosa: "+nimi);
                    conn.end();
                })
            //.then(conn.destroy()) // Close the connection
        })
}

function syotaResepti(nimi, valmistusaika, kokkausohje, kuva, callback) { // strings: nimi, valmistusaika, kuva. int: kokkausohje
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
           // var result;
            conn.query('use reseptiapi') // Execute a query
            conn.query('INSERT INTO reseptit(nimi, valmistusaika, kokkausohje, kuva) VALUES("'+nimi+'", '+valmistusaika+', "'+kokkausohje+'", "'+kuva+'")') // Execute a query
                .then((res) => {
                    result = res;
                    //console.log(result); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
                    conn.end();
                    callback && callback(result)
                })
                .catch(err => {
                    //handle error
                    result = err;
                    //console.log(result);
                    conn.end();
                    callback && callback(result)
                })
        })
}


// mySQL connection test
mysqlConnectionTest();
haeReseptiById(6)
//haeReseptiById(6)

// export functions
module.exports.reseptiLista = reseptiLista;
module.exports.reseptiHaku = reseptiHaku;
module.exports.syotaResepti = syotaResepti;
module.exports.haeReseptiById = haeReseptiById;