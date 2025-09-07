const mongoose = require("mongoose");

function connectDb() {
  mongoose
    .connect(process.env.MONGO_URI)

    .then(() => {
      console.log("Db connceted");
    })
    .catch((err) => {
      console.log("db error", err);
    });
}

module.exports = connectDb;
