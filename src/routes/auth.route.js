const express = require("express");

const authController = require("../controllers/auth.controller");
const authenticateUser = require("../middleware/auth.middleware");
const upload = require("../middleware/multer");

const router = express.Router();

// ==========================================
// PUBLIC ROUTES
// ==========================================

router.post("/login", authController.loginUser);

router.post("/logout", authController.logoutUser);

// ==========================================
// PROTECTED ROUTES
// ==========================================

// Get current user
router.get(
    "/me",
    authenticateUser,
    authController.getCurrentUser
);

// Update username & email
router.put(
    "/profile",
    authenticateUser,
    authController.updateProfile
);

// Upload profile image
router.put(
    "/profile/image",
    authenticateUser,
    upload.single("profileImage"),
    authController.uploadProfileImage
);

// Change password
router.put(
    "/password",
    authenticateUser,
    authController.updatePassword
);

// Delete account
router.delete(
    "/account",
    authenticateUser,
    authController.deleteAccount
);

module.exports = router;