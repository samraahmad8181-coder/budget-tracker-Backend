const express = require("express");

const {
    getTrips,
    getTrip,
    createTrip,
    updateTrip,
    updateTripStatus,
    deleteTrip,
} = require("../controllers/trips.controller");

const router = express.Router();


// Get all trips
router.get("/", getTrips);


// Get single trip
router.get("/:id", getTrip);


// Create trip
router.post("/", createTrip);


// Update trip
router.put("/:id", updateTrip);


// Update status
router.patch("/:id/status", updateTripStatus);


// Delete trip
router.delete("/:id", deleteTrip);


module.exports = router;