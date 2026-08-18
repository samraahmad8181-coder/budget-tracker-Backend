// const { Pool } = require("pg");

// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

// module.exports = pool;

const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

module.exports = { db, pool };