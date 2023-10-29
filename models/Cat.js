let mongoose = require("mongoose");

let catSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
});

mongoose.model("Cat", catSchema);
