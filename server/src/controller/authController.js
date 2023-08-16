const User = require("../model/userModel.js");
const { hashPassword, comparePassword } = require("../helper/auth.js");
const jwt = require("jsonwebtoken"); 

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ error: "Email is taken" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    //create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.json({ error: "User not found" });
    }
    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.json({ error: "Invalid email or password" });
    }
    //create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};


exports.logout = async (req, res) => {
  try {
    await res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};







exports.updateProfile = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findById(req.user._id);

    // check password length
    if (password && password.length < 6) {
      return res.json({
        error: "Password is required and should be min 6 characters long",
      });
    }
    // // hash the password
    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );

    updated.password = undefined;
    updated.role = undefined;
    res.json(updated);
  } catch (err) {
    console.log(err);
  }
};

