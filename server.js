require("dotenv").config();

const app = require("./src/app");
const {pool} = require("./src/db/db");

const PORT = process.env.PORT || 3000;

pool.query("SELECT NOW()")
    .then(() => {
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Database connection error:", err);
    });
