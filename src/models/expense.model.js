const pool = require("../db/db");

// Get all expenses
const getAllExpenses = async () => {
    const result = await pool.query(`
        SELECT *
        FROM expenses
        ORDER BY id DESC
    `);

    return result.rows;
};

// Get expense by ID
const getExpenseById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM expenses
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

// Create expense
const createExpense = async (expense) => {
    const {
        subject,
        merchant,
        expense_date,
        amount,
        currency,
        reimbursable,
        category,
        description,
        name,
        report_name,
        status,
        invoice_url,
    } = expense;

    const result = await pool.query(
        `
        INSERT INTO expenses (
            subject,
            merchant,
            expense_date,
            amount,
            currency,
            reimbursable,
            category,
            description,
            name,
            report_name,
            status,
            invoice_url
        )
        VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, $12
        )
        RETURNING *
        `,
        [
            subject,
            merchant,
            expense_date,
            amount,
            currency,
            reimbursable,
            category,
            description,
            name,
            report_name,
            status,
            invoice_url,
        ]
    );

    return result.rows[0];
};

// Update expense
const updateExpense = async (id, expense) => {
    const {
        subject,
        merchant,
        expense_date,
        amount,
        currency,
        reimbursable,
        category,
        description,
        name,
        report_name,
        status,
        invoice_url,
    } = expense;

    const result = await pool.query(
        `
        UPDATE expenses
        SET
            subject = $1,
            merchant = $2,
            expense_date = $3,
            amount = $4,
            currency = $5,
            reimbursable = $6,
            category = $7,
            description = $8,
            name = $9,
            report_name = $10,
            status = $11,
            invoice_url = $12
        WHERE id = $13
        RETURNING *
        `,
        [
            subject,
            merchant,
            expense_date,
            amount,
            currency,
            reimbursable,
            category,
            description,
            name,
            report_name,
            status,
            invoice_url,
            id,
        ]
    );

    return result.rows[0];
};

// Delete expense
const deleteExpense = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM expenses
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};



module.exports = {
    getAllExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
};