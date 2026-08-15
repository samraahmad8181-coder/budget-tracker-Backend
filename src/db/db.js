const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

<<<<<<< HEAD
module.exports = pool;
=======
module.exports = pool;
>>>>>>> ce4596a9d68f77e9e8969cf9567224de17d6b6f7
