const mongoose = require("mongoose");
function connectDb() {
  mongoose.connect(
    "mongodb+srv://nidhi15sak_db_user:Qdn7QzYGO4vEzTTK@cluster0.8zuevhx.mongodb.net/DataVisualizationDashboard"
  );
}
module.exports = connectDb;
