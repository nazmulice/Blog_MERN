const express = require("express");

const router = express.Router();

// middleware
const { requireSignIn, isAdmin } = require("../../middleware/authMiddleware");

// controllers
const {
  register,
  login,
  updateProfile,
  logout,
  allUser,
} = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireSignIn, logout); 
router.put("/profile", requireSignIn, updateProfile);
router.get("/user", allUser);


module.exports = router;
