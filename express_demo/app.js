const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use("/static", express.static(__dirname + "/public"));
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({ extended: true }));

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get("/time", (req, res) => {
  let date = new Date(req.requestTime);
  let responseText = `<h1>Current Time</h1><br>`;
  responseText += `<h4>${date}</h4>`;
  res.send(responseText);
});

app.get("/user/:id/personal_number/:number", (req, res) => {
  let params = req.params;
  responseText = `User ID: ${params.id}<br>`;
  responseText += `Personal Number: ${params.number}<br>`;
  res.send(responseText);
});

app.get("/download", (req, res) => {
  const file = `${__dirname}/static/example.txt`;
  res.download(file);
});

app.get("/pug", (req, res) => {
  res.render("index", { title: "PUG", message: "Testing Pug" });
});

app.post("/create", (req, res) => {
  console.log(req.body);
  let name = req.body.name;
  let age = req.body.age;
  //   res.send(`Name: ${name}<br>Age: ${age}`);
  text = `Name: ${name}; Age: ${age}`;
  res.render("index", { title: "PUG", message: text });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
