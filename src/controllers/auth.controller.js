const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/auth.model");
const {
    uploadImage,
    deleteImage,
} = require("../services/storage.services");

// ==========================================
// LOGIN
// ==========================================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        const user = await userModel.getUserByEmail(email);

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                profileImage: user.profile_image,
            },
        });
    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Login failed",
            error: error.message,
        });
    }
};

// ==========================================
// LOGOUT
// ==========================================
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        res.status(200).json({
            message: "User logged out successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Logout failed",
            error: error.message,
        });
    }
};

// ==========================================
// GET CURRENT USER
// ==========================================
const getCurrentUser = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                profileImage: user.profile_image,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch user",
            error: error.message,
        });
    }
};

// ==========================================
// UPDATE PROFILE (USERNAME & EMAIL)
// ==========================================
const updateProfile = async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({
                message: "Username and email are required",
            });
        }

        const existingUser = await userModel.getUserByEmail(email);

        if (
            existingUser &&
            existingUser.id !== req.user.id
        ) {
            return res.status(409).json({
                message: "Email is already in use",
            });
        }

        const updatedUser =
            await userModel.updateUserProfile(
                req.user.id,
                username,
                email
            );

        res.status(200).json({
            message: "Profile updated successfully",
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                profileImage: updatedUser.profile_image,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update profile",
            error: error.message,
        });
    }
};

// ==========================================
// UPLOAD PROFILE IMAGE
// ==========================================
const uploadProfileImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No image uploaded",
            });
        }

        // Get current user
        const user = await userModel.getUserById(req.user.id);

        // Delete old image if it exists
        if (user.profile_file_id) {
            await deleteImage(user.profile_file_id);
        }

        // Upload new image
        const uploaded = await uploadImage(
            req.file.buffer,
            req.file.originalname
        );

        // Save new image URL and File ID
        const updatedUser = await userModel.updateProfileImage(
            req.user.id,
            uploaded.url,
            uploaded.fileId
        );

        res.status(200).json({
            message: "Profile image updated successfully",
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                profileImage: updatedUser.profile_image,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to upload profile image",
            error: error.message,
        });
    }
};

// ==========================================
// CHANGE PASSWORD
// ==========================================
const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                message:
                    "Current password and new password are required",
            });
        }

        if (newPassword.length < 6) {
            return res.status(400).json({
                message:
                    "New password must be at least 6 characters",
            });
        }

        const user =
            await userModel.getUserById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const isPasswordValid =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Current password is incorrect",
            });
        }

        const hashedPassword =
            await bcrypt.hash(newPassword, 10);

        await userModel.updatePassword(
            req.user.id,
            hashedPassword
        );

        res.status(200).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update password",
            error: error.message,
        });
    }
};

// ==========================================
// DELETE ACCOUNT
// ==========================================
const deleteAccount = async (req, res) => {
    try {
        const deletedUser =
            await userModel.deleteUser(req.user.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        res.status(200).json({
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete account",
            error: error.message,
        });
    }
};

module.exports = {
    loginUser,
    logoutUser,
    getCurrentUser,
    updateProfile,
    uploadProfileImage,
    updatePassword,
    deleteAccount,
};