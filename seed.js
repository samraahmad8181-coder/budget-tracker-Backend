require("dotenv").config();

const { pool } = require("./src/db/db");

async function seed() {
    try {
        await pool.query(
            `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)`,
             [
                "Ahmad",
                "ahmad8862@gmail.com",
                "$2b$10$rmJxjDPvJCsVNy3VfRab5uCE3unGQ2OWDYGZRaagAnv/HA8ZCmn5e",
                "admin",
            ]
        );

        console.log("✅ Admin user inserted");
    } catch (err) {
        console.error(err);
    } finally {
        await pool.end();
    }
}

seed();
