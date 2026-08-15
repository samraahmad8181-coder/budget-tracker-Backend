const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

pool.connect().then(() =>
    console.log('Database is connected')
);

module.exports = pool;
