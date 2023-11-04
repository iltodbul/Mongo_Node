let mongoose = require("mongoose");
let connection = "mongodb://127.0.0.1:27017/mongoosedb";
require("../models/Owner");
require("../models/Cat");

let Cat = mongoose.model("Cat");
let Owner = mongoose.model("Owner");

mongoose
  .connect(connection)
  .then(() => {
    console.log("Mongoose is up and running!");
    let cat1 = new Cat({ name: "Choc", age: 1 });
    let cat2 = new Cat({ name: "Shos", age: 1 });
    let owner = new Owner({
      username: "PP",
      name: {
        firstName: "P",
        lastName: "Ivanov",
      },
      age: 22,
      cats: [cat1, cat2],
    })
      .save()
      .catch(console.log)
      .then(console.log);
    // owner.introduction = new Date();
    // console.log(owner.introduction);
    // owner.sayHello();
  })
  .catch(console.log);

// mongoose
//   .connect(connection)
//   .then(() => {
//     console.log("Mongoose is up and running!");
//     Cat.find().then((cats) => {
//       cats.forEach((cat) => {
//         console.log(cat.age);
//       });
//     });
//   })
//   .catch(console.log);

mongoose.connect(connection).then(() => {
  Cat.find()
    .where("name")
    .equals("Vankata")
    .select("age")
    // .select("age name")
    .then(console.log);
});
