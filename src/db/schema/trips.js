const {
    pgTable,
    serial,
    varchar,
    decimal,
    date,
    timestamp,
} = require("drizzle-orm/pg-core");

const trips = pgTable("trips", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),

    category: varchar("category", { length: 100 }).notNull(),

    purpose: varchar("purpose", { length: 255 }),

    flight_type: varchar("flight_type", { length: 100 }),

    depart_form: varchar("depart_form", { length: 255 }),

    destination: varchar("destination", { length: 255 }),

    start_date: date("start_date"),

    end_date: date("end_date"),

    amount: decimal("amount", {
        precision: 12,
        scale: 2,
    }),

    check_in: date("check_in"),

    check_out: date("check_out"),

    hotel: varchar("hotel", { length: 255 }),

    currency: varchar("currency", { length: 10 }),

    report_name: varchar("report_name", { length: 255 }),

    status: varchar("status", { length: 50 }),
});

module.exports = { trips };