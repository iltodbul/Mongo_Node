let mongoose = require("mongoose");
require("./Cat");

let Cat = mongoose.model("Cat");

let ownerSchema = new mongoose.Schema({
  username: { type: String, required: true, index: true, unique: true },
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, default: 0 },
  cats: [Cat.schema],
});

ownerSchema.path("name.firstName").validate((value) => {
  return value !== "Pesho";
}, "This DB not accept owners with first name 'Pesho'");

ownerSchema.methods.sayHello = () => {
  console.log(`I am added in ${connection}`);
};

ownerSchema.virtual("introduction").get(function () {
  return this._customIntroduction;
});

ownerSchema.virtual("introduction").set(function (value) {
  let message = `My name is ${this.name.firstName} ${this.name.lastName} added at ${value}`;
  return (this._customIntroduction = message);
});

mongoose.model("Owner", ownerSchema);
