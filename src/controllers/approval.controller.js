const approvalModel = require("../models/approval.model");


// ===============================
// GET ALL APPROVALS
// ===============================
const getApprovals = async (req, res) => {
    try {
        const approvals = await approvalModel.getApprovals();

        res.status(200).json({
            approvals,
        });
    } catch (error) {
        console.error("Get approvals error:", error);

        res.status(500).json({
            message: "Failed to fetch approvals",
            error: error.message,
        });
    }
};


// ===============================
// GET SINGLE APPROVAL
// ===============================
const getApprovalById = async (req, res) => {
    try {
        const { id } = req.params;

        const approval = await approvalModel.getApprovalById(id);

        if (!approval) {
            return res.status(404).json({
                message: "Approval not found",
            });
        }

        res.status(200).json({
            approval,
        });
    } catch (error) {
        console.error("Get approval error:", error);

        res.status(500).json({
            message: "Failed to fetch approval",
            error: error.message,
        });
    }
};


// ===============================
// UPDATE FREQUENCY
// ===============================
const updateApprovalFrequency = async (req, res) => {
    try {
        const { id } = req.params;
        const { frequency } = req.body;

        const allowedFrequencies = [
            "Once",
            "Monthly",
            "Bi-Monthly",
        ];

        if (!frequency) {
            return res.status(400).json({
                message: "Frequency is required",
            });
        }

        if (!allowedFrequencies.includes(frequency)) {
            return res.status(400).json({
                message: "Invalid frequency",
            });
        }

        const approval =
            await approvalModel.updateApprovalFrequency(
                id,
                frequency
            );

        if (!approval) {
            return res.status(404).json({
                message: "Approval not found",
            });
        }

        res.status(200).json({
            message: "Frequency updated successfully",
            approval,
        });
    } catch (error) {
        console.error(
            "Update approval frequency error:",
            error
        );

        res.status(500).json({
            message: "Failed to update frequency",
            error: error.message,
        });
    }
};


// ===============================
// APPROVE / REJECT
// ===============================
const updateApprovalStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Approved",
            "Rejected",
        ];

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
            });
        }

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
            });
        }

        const approval =
            await approvalModel.updateApprovalStatus(
                id,
                status
            );

        if (!approval) {
            return res.status(404).json({
                message: "Approval not found",
            });
        }

        res.status(200).json({
            message: "Approval status updated successfully",
            approval,
        });
    } catch (error) {
        console.error(
            "Update approval status error:",
            error
        );

        res.status(500).json({
            message: "Failed to update approval status",
            error: error.message,
        });
    }
};

const deleteApproval = async (req, res) => {
    try {
        const { id } = req.params;

        const approval = await approvalModel.deleteApprovalModel(id);

        if (!approval) {
            return res.status(404).json({
                success: false,
                message: "Approval not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Approval deleted successfully",
            approval,
        });
    } catch (error) {
        console.error("Delete approval error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete approval",
            error: error.message,
        });
    }
};

module.exports = {
    getApprovals,
    getApprovalById,
    updateApprovalFrequency,
    updateApprovalStatus,
    deleteApproval,
};