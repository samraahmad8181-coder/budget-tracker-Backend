const pool = require("../db/db");

const getDashboardData = async () => {
    // ===========================
    // Pending Tasks
    // ===========================

    const pendingApprovals = await pool.query(`
        SELECT COUNT(*)::int AS count
        FROM approvals
        WHERE status = 'Pending'
    `);

    const unreportedExpenses = await pool.query(`
        SELECT COUNT(*)::int AS count
        FROM expenses
        WHERE status = 'Not Submitted'
    `);

    // ===========================
    // Recent Expenses
    // (Join Expenses + Approvals)
    // ===========================

    const recentExpenses = await pool.query(`
        SELECT
            e.id,
            e.subject,
            e.name,
            e.amount,
            e.currency,
            e.category,
            e.status,
            a.frequency,
            a.status AS approval_status
        FROM expenses e
        LEFT JOIN approvals a
            ON a.expense_id = e.id
        ORDER BY e.id DESC
        LIMIT 5
    `);

    // ===========================
    // Chart 1
    // Spending By Employee
    // ===========================

    const teamSpending = await pool.query(`
        SELECT
            name,
            SUM(amount) AS total
        FROM expenses
        GROUP BY name
        ORDER BY total DESC
    `);

    // ===========================
    // Chart 2
    // Spending By Category
    // ===========================

    const categorySpending = await pool.query(`
        SELECT
            category,
            SUM(amount) AS total
        FROM expenses
        GROUP BY category
        ORDER BY total DESC
    `);

    return {
        pendingTasks: {
            pendingApprovals: pendingApprovals.rows[0].count,
            newTrips: 0,
            unreportedExpenses: unreportedExpenses.rows[0].count,
            upcomingExpenses: 0,
            unreportedAdvances: "€0.00",
        },

        recentExpenses: recentExpenses.rows,

        charts: {
            teamSpending: teamSpending.rows,
            categorySpending: categorySpending.rows,
        },
    };
};

module.exports = {
    getDashboardData,
};