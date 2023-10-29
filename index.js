let mongodb = require("mongodb").MongoClient; // Require MongoDB module
let connection = "mongodb://127.0.0.1:27017"; // Connection URL

mongodb
  .connect(connection)
  .then((db) => {
    console.log("MongoDb up and running");
  })
  .catch(console.log);
