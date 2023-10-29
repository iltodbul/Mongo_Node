let mongodb = require("mongodb").MongoClient; // Require MongoDB module
let connection = "mongodb://127.0.0.1:27017"; // Connection URL

function randomColor() {
  let colors = ["red", "green", "blue", "yellow", "black", "white"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function randomName() {
  let names = ["Tom", "Jerry", "Garfield", "Felix", "Sylvester", "Tweety"];
  return names[Math.floor(Math.random() * names.length)];
}

function randomAge() {
  return Math.floor(Math.random() * 10);
}

// mongodb
//   .connect(connection)
//   .then((db) => {
//     console.log("MongoDb up and running");
//     let dbo = db.db("cats"); // Database name
//     let collection = dbo.collection("lions"); // Collection name
//     let cats = [];
//     for (let index = 0; index < 10; index++) {
//       cats.push({ name: randomName(), age: randomAge(), color: randomColor() });
//     }
//     collection.insertMany(cats).then((result) => {
//       console.log(result);
//       db.close();
//     });
//   })
//   .catch(console.log);

mongodb
  .connect(connection)
  .then((db) => {
    let dbo = db.db("cats"); // Database name
    let collection = dbo.collection("lions"); // Collection name
    collection
      .find({ name: "Jerry" })
      .toArray()
      .then((lions) => {
        db.close();
        console.log(lions);
        lions.forEach((lion) => {
          console.log(`${lion.name} is ${lion.age} old`);
        });
      });
  })
  .catch(console.log);
