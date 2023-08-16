const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const { readdirSync } = require("fs");

//const router = require("./src/routes/api");
const app = express();
const path = require("path");

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(hpp());
app.use(bodyParser.json());

// Rate limiting
app.use(
  "/api/v1",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes, limit each IP to 100 request
    max: 100,
  })
);


// routes middleware
readdirSync("./src/routes").map((r) =>
  app.use("/api/v1", require(`./src/routes/${r}`))
);

// Routes
//app.use("/api/v1", router);

//home route
app.get("/", (req, res) => {
  res.send("Hello home page");
});

//home route
app.get("*", (req, res) => {
  res.send("Error! 404 not found route");
});



// Connect to MongoDB
//mongodb://localhost:27017/BlogProject
mongoose
  .connect("mongodb://localhost:27017/BlogProject", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

module.exports = app;
