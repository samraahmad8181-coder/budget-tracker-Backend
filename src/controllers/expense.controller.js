const expenseModel = require("../models/expense.model");
const approvalModel = require("../models/approval.model");

// GET /api/expenses
const getExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.getAllExpenses();

        res.status(200).json({
            success: true,
            data: expenses,
        });
    } catch (error) {
        console.error("Get expenses error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch expenses",
        });
    }
};

// GET /api/expenses/:id
const getExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await expenseModel.getExpenseById(id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({
            success: true,
            data: expense,
        });
    } catch (error) {
        console.error("Get expense error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch expense",
        });
    }
};

// POST /api/expenses
// POST /api/expenses
const createExpense = async (req, res) => {
    try {
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
        } = req.body;

        // Required fields
        if (
            !subject ||
            !merchant ||
            !expense_date ||
            amount === undefined ||
            !category ||
            !name
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Subject, merchant, expense date, amount, category and employee are required",
            });
        }

        // ================================
        // CREATE EXPENSE
        // ================================
        const expense = await expenseModel.createExpense({
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
        });

        // ================================
        // CREATE APPROVAL
        // ================================
        await approvalModel.createApprovalForExpense(
            expense.id
        );

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            data: expense,
        });

    } catch (error) {
        console.error("Create expense error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create expense",
        });
    }
};

// PUT /api/expenses/:id
const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const existingExpense = await expenseModel.getExpenseById(id);

        if (!existingExpense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

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
        } = req.body;

        const expense = await expenseModel.updateExpense(id, {
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
        });

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            data: expense,
        });
    } catch (error) {
        console.error("Update expense error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update expense",
        });
    }
};

// DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;

        const expense = await expenseModel.deleteExpense(id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
            data: expense,
        });
    } catch (error) {
        console.error("Delete expense error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete expense",
        });
    }
};

module.exports = {
    getExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense,
};