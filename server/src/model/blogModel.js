const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmiqR_gB1aE6SmGpJvgdi6j6MZYtLpcSittA&usqp=CAU",
    },
    author: {
      type: String,
      required: true,
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

