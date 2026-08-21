const {
    pgTable,
    serial,
    varchar,
    text,
    decimal,
    boolean,
    date,
    timestamp,
} = require("drizzle-orm/pg-core");

const expenses = pgTable("expenses", {
    id: serial("id").primaryKey(),

    subject: varchar("subject", { length: 255 }).notNull(),
    merchant: varchar("merchant", { length: 255 }).notNull(),

    expense_date: date("expense_date").notNull(),

    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 })
        .notNull()
        .default("EUR"),

    reimbursable: boolean("reimbursable")
        .notNull()
        .default(false),

    category: varchar("category", { length: 100 }).notNull(),

    description: text("description"),

    name: varchar("name", { length: 255 }).notNull(),

    report_name: varchar("report_name", { length: 255 }),

    status: varchar("status", { length: 50 })
        .notNull()
        .default("Not Submitted"),

    invoice_url: text("invoice_url"),
});

module.exports = { expenses };