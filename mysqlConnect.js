var mariadb = require('mariadb');

mysqlUser = 'monty'
mysqlPassword = 'metrofilia1'
mysqlHost = 'haxers.ddns.net'
mysqlPort = 3306

function mysqlConnectionTest() {
    mariadb.createConnection({ // Open a new connection
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        port: mysqlPort
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
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        port: mysqlPort
    })
        .then(conn => {
            conn.query('use reseptiapi') // select database
            // reseptilista + ainesosat
            conn.query("SELECT r.`id`, r.`nimi`, r.`valmistusaika`, r.`kokkausohje`, r.`kuva`,  GROUP_CONCAT(a.`nimi` separator ', ') FROM `reseptit` r LEFT JOIN `ainesosat` a on a.`reseptiID` = r.`id` GROUP BY r.`id`, r.`nimi`;")
            // perus reseptilista
            //conn.query('SELECT * FROM reseptit')
                .then(result => {
                    var alteredresult = JSON.stringify(result);
                    //console.log("Reseptilista: " +alteredresult);
                    callback && callback(alteredresult);
                })
                .then(conn.destroy()) // Close the connection
        })
}

function reseptiJaAinesosaLista(callback){
    mariadb.createConnection({ // Open a new connection
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        port: mysqlPort
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
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        port: mysqlPort
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('SELECT * FROM reseptit WHERE nimi LIKE "%'+reseptinNimi+'%";')//?;',[reseptinNimi]) // Execute a query
                .then(result => { // Print the results
                    var alteredresult  = JSON.stringify(result); // turns the mysql query result into string
                    //console.log("Haettu resepti: " +alteredresult);
                    callback && callback(alteredresult);
                })
                .catch(err => {
                    //handle error
                    console.log(err);
                    conn.end();
                    callback && callback(err)
                })
                .then(conn.destroy()) // Close the connection
        })
}

function ainesosaHaku(hakusana, callback) {
    mariadb.createConnection({ // Open a new connection
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        port: mysqlPort
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('SELECT * FROM ainesosat WHERE nimi LIKE "%'+hakusana+'%";') // Execute a query
                .then(result => { // Print the resultsr
                    var alteredresult  = JSON.stringify(result); // turns the mysql query result into string
                    //console.log("Haettu ainesosa: " +alteredresult);
                    callback && callback(alteredResult)
                })
                .catch(err => {
                    //handle error
                    console.log(err);
                    conn.end();
                    callback && callback(err)
                })
        })
        .then(conn.destroy()); // Close the connection

}

function haeReseptiId(nimi, callback){
    mariadb.createConnection({ // Open a new connection
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        port: mysqlPort
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('SELECT id FROM reseptit WHERE nimi="'+nimi+'";') // Execute a quer
                .then(result => { // Print the resultsr
                    var alteredresult  = JSON.stringify(result); // turns the mysql query result into string
                    console.log("Haettu reseptiID: " +alteredresult);
                    callback && callback(alteredresult)
                })
                .catch(err => {
                    //handle error
                    console.log(err);
                    conn.end();
                    callback && callback(err)
                })
            conn.destroy()
        }); // Close the connection
}

function haeReseptiById(id, callback) {
    mariadb.createConnection({ // Open a new connection
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        port: mysqlPort
    })
        .then(conn => {
            conn.query('use reseptiapi') // select database
            //conn.query("SELECT * FROM reseptit WHERE id='"+id+"';") // searches recipe based on id
            conn.query("SELECT r.`id`, r.`nimi`, r.`valmistusaika`, r.`kokkausohje`, r.`kuva`,  GROUP_CONCAT(a.`nimi` separator ', ') FROM `reseptit` r LEFT JOIN `ainesosat` a ON a.`reseptiID`=r.`id` WHERE r.`id`=? GROUP BY r.`id`, r.`nimi`;",[id])
                .then(result => { // Print the results
                    var alteredresult  = JSON.stringify(result); // turns the mysql query result into string
                    //console.log("Haettu resepti: " +alteredresult);
                    if (callback) {
                        callback(alteredresult);
                    }
                })
                .catch(err => {
                    //handle error
                    console.log(err);
                    conn.end();
                    callback && callback(err)
                })
                .then(conn.destroy()) // Close the connection
        })
}

function syotaResepti(nimi, valmistusaika, kokkausohje, kuva, callback) { // strings: nimi, valmistusaika, kuva. int: kokkausohje
    mariadb.createConnection({ // Open a new connection
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        port: mysqlPort
    })
        .then(conn => {
           // var result;
            conn.query('use reseptiapi') // Execute a query
            conn.query('INSERT INTO reseptit(nimi, valmistusaika, kokkausohje, kuva) VALUES("'+nimi+'", '+valmistusaika+', "'+kokkausohje+'", "'+kuva+'")') // Execute a query
                .then((res) => {
                    result = res;
                    conn.end();
                    callback && callback(result)
                })
                .catch(err => {
                    //handle error
                    console.log(err);
                    conn.end();
                    callback && callback(result)
                })
        })
}

function syotaAinesosa(ainesosat, reseptiId) {
    mariadb.createConnection({ // Open a new connection
        user: mysqlUser,
        password: mysqlPassword,
        host: mysqlHost,
        port: mysqlPort
    })
        .then(conn => {
            conn.query('use reseptiapi') // Choose database
            conn.query('INSERT INTO ainesosat(nimi, reseptiID) VALUES("'+ainesosat+'",'+reseptiId+');') // Execute query
                .catch(err => {
                    //handle error
                    console.log(err);
                    conn.end();
                })
            //.then(conn.destroy()) // Close the connection
        })
}

// mySQL connection test
mysqlConnectionTest();

// export functions
module.exports.reseptiLista = reseptiLista;
module.exports.reseptiHaku = reseptiHaku;
module.exports.syotaResepti = syotaResepti;
module.exports.syotaAinesosa = syotaAinesosa;
module.exports.haeReseptiById = haeReseptiById;
module.exports.haeReseptiId = haeReseptiId;

