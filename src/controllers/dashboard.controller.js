const dashboardModel = require("../models/dashboard.model");

const getDashboard = async (req, res) => {
    try {
        const dashboard =
            await dashboardModel.getDashboardData();

        res.status(200).json({
            success: true,
            data: dashboard,
        });

    } catch (error) {

        console.error("Dashboard Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard",
        });

    }
};

module.exports = {
    getDashboard,
};