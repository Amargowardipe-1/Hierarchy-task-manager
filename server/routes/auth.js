const express = require("express");

const router = express.Router();

const {
    loginUser,
    registerUser,
    refreshToken,
    logoutUser
} = require("../controllers/authController");

const { authenticateToken } = require("../middleware/auth");

// PUBLIC ROUTES
router.post("/login", loginUser);

router.post("/register", authenticateToken, registerUser);

router.post("/refresh-token", authenticateToken, refreshToken);

// PROTECTED ROUTE
router.post("/logout", authenticateToken, logoutUser);

module.exports = router;