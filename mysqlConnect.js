var mariadb = require('mariadb')

function mysqlConnectionTest() {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('SELECT "Hello world!" as my_message') // Execute a query
                .then(result => { // Print the results
                    for (row of result) {
                        console.log(row)
                    }
                })
                .then(conn.destroy()) // Close the connection
        })
}

function reseptiLista() {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('SELECT * FROM reseptit') // Execute a query
                .then(result => { // Print the results
                    for (row of result) {
                        console.log(row)
                    }
                    })
                .then(conn.destroy()) // Close the connection
            return result
        })

}

function reseptiHaku(reseptinNimi) {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('SELECT "' + reseptinNimi + '" FROM reseptit') // Execute a query
                .then(result => { // Print the results
                    for (row of result) {
                        console.log(row)
                    }
                    })
                .then(conn.destroy()) // Close the connection
            return result
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
            conn.query('SELECT nimi FROM ainesosat WHERE reseptiID=reseptiId') // Execute a query
                .then(result => { // Print the resultsr
                    for (row of result) {
                        console.log(row)
                    }
                })
                .then(conn.destroy()) // Close the connection
            return result
        })

}

function syotaResepti(nimi, valmistusaika, kokkausohje) {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Execute a query
            conn.query('INSERT INTO reseptit(nimi, valmistusaika, kokkausohje) VALUES("'+nimi+'", '+valmistusaika+', "'+kokkausohje+'")') // Execute a query
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

mysqlConnectionTest();
reseptiLista();
//reseptiHaku('Pasta bolognese');
//ainesosaHaku(1
//syotaResepti("Tosca Omenat",55,"Pilko omenat ja laita hiutaleiden kanssa uuniin");
//syotaAinesosa("Kaurahiutaleet", 5);
//syotaAinesosa("Omenat",5);

module.exports.reseptiLista = reseptiLista; // export your functuion