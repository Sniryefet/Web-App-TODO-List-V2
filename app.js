//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const _ = require("lodash");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const Models = require("./Models/Models");
const Item = Models.Item;
// this is the list schema
const List = Models.List;

const connectToDB = require("./database/Connection");

connectToDB.connectToMongo();

app.set("view engine", "ejs");

app.get("/", function (req, res) {
  Item.find({}, function (err, foundItems) {
    res.render("list", { listTitle: "Today", newListItems: foundItems });
  });
});

app.get("/:customListName", function (req, res) {
  // Item.find({}, function (err, foundItems) {
  //   res.render("list", { listTitle: "Today", newListItems: foundItems });
  // });
  const customListName = _.capitalize(req.params.customListName);
  List.findOne({ name: customListName }, function (err, foundList) {
    if (!err) {
      if (foundList) {
        // load the list which was founded
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items,
        });
      } else {
        // create new one empty
        const list = new List({ name: customListName, items: [] });
        list.save();
        res.render("list", { listTitle: customListName, newListItems: [] });
      }
    } else {
      console.log(err);
    }
  });
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const listTitle = req.body.list;
  const item = new Item({ name: itemName });

  if (listTitle === "Today") {
    // if we added to the main list the title of that list is 'Today'
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listTitle},function (err,foundList) {
        foundList.items.push(item);
        foundList.save();
        res.redirect("/"+listTitle);

      });
  }

});

app.post("/delete", function (req, res) {
  const checkedItemID = req.body.checkbox;
  const listName = req.body.listName;

  if(listName==="Today"){
   
    Item.findByIdAndRemove(checkedItemID, function (err) {
      if (!err) {
        res.redirect("/");
      }
    });

  }else{

    List.findOneAndUpdate({name:listName},{$pull:{items:{_id:checkedItemID}}},function (err,foundList) {
      if(!err){
        res.redirect("/"+listName);
      }

      });
  }
  

  
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
