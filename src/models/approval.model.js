const pool = require("../db/db");

// ==========================================
// GET ALL APPROVALS
// ==========================================
const getApprovals = async () => {
    const result = await pool.query(`
        SELECT
            a.id,
            a.expense_id,
            a.trip_id,
            a.frequency,
            a.status,
            a.created_at,

            COALESCE(e.name, t.name) AS name,
            COALESCE(e.category, t.category) AS category,
            COALESCE(e.amount, t.amount) AS amount,

            CASE
                WHEN a.expense_id IS NOT NULL THEN 'expense'
                WHEN a.trip_id IS NOT NULL THEN 'trip'
            END AS source_type

        FROM approvals a

        LEFT JOIN expenses e
            ON a.expense_id = e.id

        LEFT JOIN trips t
            ON a.trip_id = t.id

        ORDER BY a.created_at DESC
    `);

    return result.rows;
};


// ==========================================
// GET SINGLE APPROVAL
// ==========================================
const getApprovalById = async (id) => {
    const result = await pool.query(
        `
        SELECT
            a.id,
            a.expense_id,
            a.trip_id,
            a.frequency,
            a.status,
            a.created_at,

            COALESCE(e.name, t.name) AS name,
            COALESCE(e.category, t.category) AS category,
            COALESCE(e.amount, t.amount) AS amount,

            CASE
                WHEN a.expense_id IS NOT NULL THEN 'expense'
                WHEN a.trip_id IS NOT NULL THEN 'trip'
            END AS source_type

        FROM approvals a

        LEFT JOIN expenses e
            ON a.expense_id = e.id

        LEFT JOIN trips t
            ON a.trip_id = t.id

        WHERE a.id = $1
        `,
        [id]
    );

    return result.rows[0];
};


// ==========================================
// UPDATE FREQUENCY
// ==========================================
const updateApprovalFrequency = async (
    id,
    frequency
) => {
    const result = await pool.query(
        `
        UPDATE approvals
        SET frequency = $1
        WHERE id = $2
        RETURNING *
        `,
        [frequency, id]
    );

    return result.rows[0];
};


// ==========================================
// UPDATE STATUS
// ==========================================
const updateApprovalStatus = async (
    id,
    status
) => {
    const result = await pool.query(
        `
        UPDATE approvals
        SET status = $1
        WHERE id = $2
        RETURNING *
        `,
        [status, id]
    );

    return result.rows[0];
};


// ==========================================
// CREATE APPROVAL FOR EXPENSE
// ==========================================
const createApprovalForExpense = async (
    expenseId
) => {
    const result = await pool.query(
        `
        INSERT INTO approvals (
            expense_id,
            frequency,
            status
        )
        VALUES ($1, 'Once', 'Pending')
        RETURNING *
        `,
        [expenseId]
    );

    return result.rows[0];
};


// ==========================================
// CREATE APPROVAL FOR TRIP
// ==========================================
const createApprovalForTrip = async (
    tripId
) => {
    const result = await pool.query(
        `
        INSERT INTO approvals (
            trip_id,
            frequency,
            status
        )
        VALUES ($1, 'Once', 'Pending')
        RETURNING *
        `,
        [tripId]
    );

    return result.rows[0];
};

const deleteApprovalModel = async (id) => {
    const result = await pool.query(
        "DELETE FROM approvals WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};

// ==========================================
// EXPORT
// ==========================================
module.exports = {
    getApprovals,
    getApprovalById,
    updateApprovalFrequency,
    updateApprovalStatus,
    createApprovalForExpense,
    createApprovalForTrip,
    deleteApprovalModel,
};