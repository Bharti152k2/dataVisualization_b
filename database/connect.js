const mongoose = require("mongoose");
function connectDb() {
  mongoose.connect("mongodb://localhost:27017/DataVisualizationDashboard", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
module.exports = connectDb;
