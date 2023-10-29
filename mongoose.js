let mongoose = require("mongoose");
let connection = "mongodb://127.0.0.1:27017/mongoosedb";

let Cat = mongoose.model("Cat", {
  name: { type: String, required: true },
  age: Number,
});

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

let Owner = mongoose.model("Owner", ownerSchema);

mongoose
  .connect(connection)
  .then(() => {
    console.log("Mongoose is up and running!");
    let cat1 = new Cat({ name: "Choc", age: 1 });
    let cat2 = new Cat({ name: "Shos", age: 1 });
    let owner = new Owner({
      username: "AA",
      name: {
        firstName: "Peshoooo",
        lastName: "Ivanov",
      },
      age: 22,
      cats: [cat1, cat2],
    })
      .save()
      .catch(console.log)
      .then(console.log);
    owner.introduction = new Date();
    console.log(owner.introduction);
    // owner.sayHello();
  })
  .catch(console.log);

mongoose
  .connect(connection)
  .then(() => {
    console.log("Mongoose is up and running!");
    let cats = Cat.find().then(console.log);
  })
  .catch(console.log);
