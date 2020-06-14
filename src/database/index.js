const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
mongoose.connect(
  "mongodb://localhost/noderest",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, db) {
    if (err) {
      console.log(
        "Unable to connect to the server. Please start the server. Error:",
        err
      );
    } else {
      console.log("Connected to Server successfully!");
    }
  }
);

module.exports = mongoose;
