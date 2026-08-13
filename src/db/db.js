const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "tracker",
    password: "8862",
    port: 5432,
});

pool.connect().then(() =>
    console.log('Database is connected')
);

// pool.query("SELECT NOW()", (err, result) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(result.rows);
//     }
// });

module.exports = pool;