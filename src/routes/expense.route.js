const express = require("express");

const {
    getExpenses,
    getExpense,
    createExpense,
    updateExpense,
    deleteExpense,
} = require("../controllers/expense.controller");

const router = express.Router();

// Get all expenses
router.get("/", getExpenses);

// Get single expense
router.get("/:id", getExpense);

// Create expense
router.post("/", createExpense);

// Update expense
router.put("/:id", updateExpense);

// Delete expense
router.delete("/:id", deleteExpense);

module.exports = router;