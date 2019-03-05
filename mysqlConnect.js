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

                })
                .then(conn.destroy()) // Close the connection
            return result
        })
    }
}

function reseptiHaku(reseptinNimi) {
    mariadb.createConnection({ // Open a new connection
        user: 'monty',
        password: 'metrofilia1',
        host: 'haxers.ddns.net',
        port: 3306
    })
        .then(conn => {
            conn.query('use reseptiapi') // Valitsee tietokannan
            conn.query('SELECT * FROM reseptit') // Execute a query
                .then(result => { // Print the results
                    for (row of result) {
                        console.log(row)

                    })
                .then(conn.destroy()) // Close the connection
            return result
        })
        }
}