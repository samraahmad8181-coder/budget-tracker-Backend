require("dotenv").config();

const {pool} = require("./src/db/db");

async function seed() {
    try {
        await pool.query(
            `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)`,
            [
                "Admin",
                "admin8862@gmail.com",
                "$2b$10$QQjVB7xxq3wJZitTyGVjiOD.u09AiPaWg.6YuuBymnpGE7bdamC8a",
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
