const blogModel = require("../model/blogModel");

exports.createBlog = async (req, res) => {
  try {
    const { title, content, img, author } = req.body;

    const newBlog = await blogModel.create(req.body);
    res.status(200).json({
      success: true,
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
exports.getAllBlog = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.blogById = async (req, res) => {
  try {
    const { id } = req.params;
      const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: blog,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
     const reqBody = req.body;

    const updateBlog = await blogModel.findByIdAndUpdate(id, reqBody, {
      new: true,
    });
    if (!updateBlog) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: updateBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await blogModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        error: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      data: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
