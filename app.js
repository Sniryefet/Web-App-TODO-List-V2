//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const Item = require("./Models/Models");
const connectToDB = require("./database/Connection");

connectToDB.connectToMongo();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    // console.log(foundTasks);
    res.render("list", { listTitle: "Today", newListItems: foundItems });
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const item = new Item({ name: itemName });
  item.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const checkedItemID = req.body.checkbox;
  console.log(checkedItemID);
  Item.findByIdAndRemove(checkedItemID, function (err) {
    if (!err) {
      console.log("successfully deleted the item");
      res.redirect("/");
    }
  });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
