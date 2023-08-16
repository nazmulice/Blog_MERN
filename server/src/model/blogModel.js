const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      require: true,
    },
    img: {
      type: String,
    },
    author: {
      type: String,
      require: true,
    },
    role: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true, // Automatically `createdAt` and `updatedAt`
    versionKey: false,
  }
);

const blogModel = mongoose.model("blogs", blogSchema);
module.exports = blogModel;

