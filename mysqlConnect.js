var mariadb = require('mariadb')

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

module.exports.reseptiLista = reseptiLista; // export your functuion