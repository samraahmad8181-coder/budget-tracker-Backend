const express = require("express");

const router = express.Router();

const {
    getApprovals,
    getApprovalById,
    updateApprovalFrequency,
    updateApprovalStatus,
    deleteApproval,
} = require("../controllers/approval.controller");


// Get all approvals
router.get("/", getApprovals);


// Get one approval
router.get("/:id", getApprovalById);


// Change frequency
router.patch(
    "/:id/frequency",
    updateApprovalFrequency
);


// Approve / Reject
router.patch(
    "/:id/status",
    updateApprovalStatus
);

router.delete("/:id", deleteApproval);


module.exports = router;