const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const path = require("path");
function connectDb() {
  mongoose.connect("mongodb://localhost:27017/DataVisualizationDashboard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
module.exports = connectDb;
