const mongoose = require("mongoose");

function connectDB() {

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

}

module.exports = connectDB;