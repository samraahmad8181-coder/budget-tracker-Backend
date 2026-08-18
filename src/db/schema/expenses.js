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

    expenseDate: date("expense_date").notNull(),

    amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
    currency: varchar("currency", { length: 10 })
        .notNull()
        .default("EUR"),

    reimbursable: boolean("reimbursable")
        .notNull()
        .default(false),

    category: varchar("category", { length: 100 }).notNull(),

    description: text("description"),

    employee: varchar("employee", { length: 255 }).notNull(),

    reportName: varchar("report_name", { length: 255 }),

    status: varchar("status", { length: 50 })
        .notNull()
        .default("Not Submitted"),

    invoiceUrl: text("invoice_url"),

    createdAt: timestamp("created_at").defaultNow(),

    updatedAt: timestamp("updated_at").defaultNow(),
});

module.exports = { expenses };