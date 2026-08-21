const {
    pgTable,
    serial,
    integer,
    varchar,
    timestamp,
} = require("drizzle-orm/pg-core");

const { expenses } = require("./expenses");
const { trips } = require("./trips");

const approvals = pgTable("approvals", {
    id: serial("id").primaryKey(),

    expense_id: integer("expense_id").references(() => expenses.id, {
        onDelete: "cascade",
    }),

    trip_id: integer("trip_id").references(() => trips.id, {
        onDelete: "cascade",
    }),

    frequency: varchar("frequency", { length: 50 })
        .notNull()
        .default("Once"),

    status: varchar("status", { length: 50 })
        .notNull()
        .default("Pending"),

    created_at: timestamp("created_at").defaultNow(),
});

module.exports = { approvals };