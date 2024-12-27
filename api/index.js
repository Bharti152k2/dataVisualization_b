const express = require("express");
const cors = require("cors");
const app = express();
const connectDb = require("../database/connect.js");
const user = require("../routes/user.routes.js");
const analytics = require("../routes/analytics.routes.js"); // Import the model
app.use(express.json());
app.use(cors());
app.use("/api", user);
app.use("/api", analytics);
let startServer = async () => {
  try {
    await connectDb();
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log(error);
  }
};
startServer();
module.exports = app;
