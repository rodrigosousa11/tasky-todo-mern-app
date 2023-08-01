const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", authenticateToken, userController.getLoggedInUserDetails);

module.exports = router;
