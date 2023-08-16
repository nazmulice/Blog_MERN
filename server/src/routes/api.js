const express = require("express");
const router = express.Router();

// const { requireSignIn, isAdmin } = require("../../middleware/authMiddleware");

const {
  getAllBlog,
  createBlog,
  blogById,
  updateBlog,
  deleteBlog,
} = require("../controller/blogController");

router.post("/create", createBlog);
router.post("/getAll", getAllBlog);
router.get("/getOne/:id", blogById);
router.post("/update/:id", updateBlog);
router.delete("/delete/:id", deleteBlog);

//login validation
// router.post("/create", requireSignIn, createBlog);
// router.post("/update/:id",requireSignIn, updateBlog);
// router.delete("/delete/:id",requireSignIn,isAdmin, deleteBlog);

module.exports = router;
