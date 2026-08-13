const tripModel = require("../models/trips.model");
const approvalModel = require("../models/approval.model");

// GET /api/trips
const getTrips = async (req, res) => {
    try {
        const trips = await tripModel.getAllTrips();

        res.status(200).json({
            success: true,
            data: trips,
        });
    } catch (error) {
        console.error("Get trips error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch trips",
        });
    }
};


// GET /api/trips/:id
const getTrip = async (req, res) => {
    try {
        const { id } = req.params;

        const trip = await tripModel.getTripById(id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        res.status(200).json({
            success: true,
            data: trip,
        });
    } catch (error) {
        console.error("Get trip error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch trip",
        });
    }
};


// POST /api/trips
// POST /api/trips
const createTrip = async (req, res) => {
    try {
        const {
            name,
            category,
            purpose,
            flight_type,
            depart_from,
            destination,
            start_date,
            end_date,
            amount,
            check_in,
            check_out,
            hotel,
            currency,
            report_name,
            status,
            approved_by,
            policy,
            travel_documents,
        } = req.body;

        // Required fields
        if (
            !name ||
            !category ||
            !depart_from ||
            !destination ||
            !start_date ||
            !end_date
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Name, trip type, depart from, destination, start date and end date are required",
            });
        }

        // ================================
        // CREATE TRIP
        // ================================
        const trip = await tripModel.createTrip({
            name,
            category,
            purpose,
            flight_type,
            depart_from,
            destination,
            start_date,
            end_date,
            amount,
            check_in,
            check_out,
            hotel,
            currency: currency || "EUR",
            report_name,
            status: status || "Pending",
            approved_by,
            policy,
            travel_documents,
        });

        // ================================
        // CREATE APPROVAL
        // ================================
        await approvalModel.createApprovalForTrip(
            trip.id
        );

        res.status(201).json({
            success: true,
            message: "Trip created successfully",
            data: trip,
        });

    } catch (error) {
        console.error("Create trip error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to create trip",
        });
    }
};


// PUT /api/trips/:id
const updateTrip = async (req, res) => {
    try {
        const { id } = req.params;

        const existingTrip = await tripModel.getTripById(id);

        if (!existingTrip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }


        const {
            name,
            category,
            purpose,
            flight_type,
            depart_from,
            destination,
            start_date,
            end_date,
            amount,
            check_in,
            check_out,
            hotel,
            currency,
            report_name,
            status,
            approved_by,
            policy,
            travel_documents,
        } = req.body;


        const trip = await tripModel.updateTrip(id, {
            name,
            category,
            purpose,
            flight_type,
            depart_from,
            destination,
            start_date,
            end_date,
            amount,
            check_in,
            check_out,
            hotel,
            currency,
            report_name,
            status,
            approved_by,
            policy,
            travel_documents,
        });


        res.status(200).json({
            success: true,
            message: "Trip updated successfully",
            data: trip,
        });

    } catch (error) {
        console.error("Update trip error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update trip",
        });
    }
};


// PATCH /api/trips/:id/status
const updateTripStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({
                success: false,
                message: "Status is required",
            });
        }


        const allowedStatuses = [
            "Pending",
            "Approved",
            "Not Approved",
            "Draft",
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status",
            });
        }


        const trip = await tripModel.updateTripStatus(id, status);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }


        res.status(200).json({
            success: true,
            message: "Trip status updated successfully",
            data: trip,
        });

    } catch (error) {
        console.error("Update trip status error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to update trip status",
        });
    }
};


// DELETE /api/trips/:id
const deleteTrip = async (req, res) => {
    try {
        const { id } = req.params;

        const trip = await tripModel.deleteTrip(id);

        if (!trip) {
            return res.status(404).json({
                success: false,
                message: "Trip not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Trip deleted successfully",
            data: trip,
        });

    } catch (error) {
        console.error("Delete trip error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to delete trip",
        });
    }
};


module.exports = {
    getTrips,
    getTrip,
    createTrip,
    updateTrip,
    updateTripStatus,
    deleteTrip,
};