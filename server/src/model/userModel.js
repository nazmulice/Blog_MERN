const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
