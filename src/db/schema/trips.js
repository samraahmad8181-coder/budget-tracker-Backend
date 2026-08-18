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

    flightType: varchar("flight_type", { length: 100 }),

    departFrom: varchar("depart_form", { length: 255 }),

    destination: varchar("destination", { length: 255 }),

    startDate: date("start_date"),

    endDate: date("end_date"),

    amount: decimal("amount", {
        precision: 12,
        scale: 2,
    }),

    checkIn: date("check_in"),

    checkOut: date("check_out"),

    hotel: varchar("hotel", { length: 255 }),

    currency: varchar("currency", { length: 10 }),

    reportName: varchar("report_name", { length: 255 }),

    status: varchar("status", { length: 50 }),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at").defaultNow(),
});

module.exports = { trips };