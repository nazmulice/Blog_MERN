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
} = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", requireSignIn, logout); 

router.get("/auth-check", requireSignIn, (req, res) => {
  res.json({ ok: true });
});
router.put("/profile", requireSignIn, updateProfile);



module.exports = router;
