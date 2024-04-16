const express = require("express");
const decor = require(__dirname + "/public/js/decor.js");
const fashion = require(__dirname + "/public/js/fashion.js");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/views")));
app.set("views", path.join(__dirname, "/views"));
console.log(path.join(__dirname, "/public"));

app.get("/", function (req, res) {
  res.render("home", { decor: decor, fashion: fashion });
});

app.get("/fashion_product/:name", function (req, res) {
  const gotName = req.params.name;
  fashion.forEach((i) => {
    if (i.dev_name === gotName) {
      res.render("fashionPage", { fashionProductDetails: i });
    }
  });
});

app.get("/decor_product/:name", function (req, res) {
  const gotName = req.params.name;
  decor.forEach((i) => {
    if (i.dev_name === gotName) {
      res.render("decorPage", { decorProductDetails: i });
    }
  });

  //res.render("decorPage");
});

app.get("/decor_ar/:model_name", function (req, res) {
  const model_name = req.params.model_name;
  res.render("decor-AR", { model_name: model_name });
});

app.get("/avatar_create", function (req, res) {
  res.render("avatar-create");
});

app.get("/avatar_render/:model_name", function (req, res) {
  const model_name = req.params.model_name;
  res.render("avatar-render", { fashion: fashion, model_name: model_name });
});

PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
  console.log("Server is up");
});
