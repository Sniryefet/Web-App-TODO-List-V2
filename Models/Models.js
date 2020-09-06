


const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ItemSchema= new Schema({
    name:{type: String, required:true}

});

const Item = mongoose.model("TodoList",ItemSchema);
module.exports.Item = Item;


const listSchema = {
    name:String,
    items:[ItemSchema]
};

const List = mongoose.model("List",listSchema);
module.exports.List = List;