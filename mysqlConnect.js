//app.js
/*
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: 'haxers.ddns.net',
    user: 'monty',
    password: 'metrofilia1',
    connectionLimit: 5
});
async function asyncFunction() {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM TABLE reseptit");
        console.log(rows); //[ {val: 1}, meta: ... ]
        //const res = await conn.query("INSERT INTO reseptit value (?, ?)", [1, "mariadb"]);
        //console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
}
*/
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
