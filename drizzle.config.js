const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
    schema: "./src/db/schema",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL,
    },
});
