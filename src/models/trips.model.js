const pool = require("../db/db");

// Get all trips
const getAllTrips = async () => {
    const result = await pool.query(`
        SELECT *
        FROM trips
       ORDER BY id DESC
    `);

    return result.rows;
};


// Get trip by ID
const getTripById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM trips
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};


// Create trip
const createTrip = async (trip) => {
    const {
        name,
        category,
        purpose,
        flight_type,
        depart_form,
        destination,
        start_date,
        end_date,
        amount,
        check_in,
        check_out,
        hotel,
        currency,
        report_name,
        status

    } = trip;

    const result = await pool.query(
        `
        INSERT INTO trips (
            name,
            category,
            purpose,
            flight_type,
            depart_form,
            destination,
            start_date,
            end_date,
            amount,
            check_in,
            check_out,
            hotel,
            currency,
            report_name,
            status
        )
        VALUES (
            $1, $2, $3, $4, $5, $6,
            $7, $8, $9, $10, $11, $12,
            $13, $14, $15
        )
        RETURNING *
        `,
        [
            name,
            category,
            purpose,
            flight_type,
            depart_form,
            destination,
            start_date,
            end_date,
            amount,
            check_in,
            check_out,
            hotel,
            currency,
            report_name,
            status

        ]
    );

    return result.rows[0];
};


// Update trip
const updateTrip = async (id, trip) => {
    const {
        name,
        category,
        purpose,
        flight_type,
        depart_form,
        destination,
        start_date,
        end_date,
        amount,
        check_in,
        check_out,
        hotel,
        currency,
        report_name,
        status
    } = trip;

    const result = await pool.query(
        `
        UPDATE trips
        SET
            name = $1,
            category = $2,
            purpose = $3,
            flight_type = $4,
            depart_form = $5,
            destination = $6,
            start_date = $7,
            end_date = $8,
            amount = $9,
            check_in = $10,
            check_out = $11,
            hotel = $12,
            currency = $13,
            report_name = $14,
            status = $15        
        WHERE id = $16
        RETURNING *
        `,
        [
            name,
            category,
            purpose,
            flight_type,
            depart_form,
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
            id,
        ]
    );

    return result.rows[0];
};


// Update status
const updateTripStatus = async (id, status) => {
    const result = await pool.query(
        `
        UPDATE trips
        SET
            status = $1
        WHERE id = $2
        RETURNING *
        `,
        [status, id]
    );

    return result.rows[0];
};


// Delete trip
const deleteTrip = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM trips
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    getAllTrips,
    getTripById,
    createTrip,
    updateTrip,
    updateTripStatus,
    deleteTrip,
};