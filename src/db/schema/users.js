const {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
} = require("drizzle-orm/pg-core");

const users = pgTable("users", {
    id: serial("id").primaryKey(),

    username: varchar("username", { length: 100 }).notNull(),

    email: varchar("email", { length: 255 }).notNull().unique(),

    password: text("password").notNull(),

    role: varchar("role", { length: 20 })
        .notNull()
        .default("user"),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at").defaultNow(),
});

module.exports = { users };