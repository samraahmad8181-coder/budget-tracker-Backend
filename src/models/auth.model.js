const pool = require("../db/db");

// ==========================================
// GET USER BY EMAIL
// ==========================================
const getUserByEmail = async (email) => {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    return result.rows[0];
};


// ==========================================
// GET USER BY ID
// ==========================================
const getUserById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};


// ==========================================
// UPDATE PROFILE (USERNAME & EMAIL)
// ==========================================
const updateUserProfile = async (id, username, email) => {
    const result = await pool.query(
        `
        UPDATE users
        SET username = $1, email = $2
        WHERE id = $3
        RETURNING *
        `,
        [username, email, id]
    );

    return result.rows[0];
};


// ==========================================
// UPDATE PROFILE IMAGE
// ==========================================
const updateProfileImage = async (id, imageUrl, fileId) => {
    const result = await pool.query(
        `
        UPDATE users
        SET profile_image = $1, profile_file_id = $2
        WHERE id = $3
        RETURNING *
        `,
        [imageUrl, fileId, id]
    );

    return result.rows[0];
};


// ==========================================
// UPDATE PASSWORD
// ==========================================
const updatePassword = async (
    id,
    password
) => {
    const result = await pool.query(
        `
        UPDATE users
        SET password = $1
        WHERE id = $2
        RETURNING id
        `,
        [
            password,
            id,
        ]
    );

    return result.rows[0];
};


// ==========================================
// DELETE USER
// ==========================================
const deleteUser = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM users
        WHERE id = $1
        RETURNING id
        `,
        [id]
    );

    return result.rows[0];
};


module.exports = {
    getUserByEmail,
    getUserById,
    updateUserProfile,
    updateProfileImage,
    updatePassword,
    deleteUser,
};