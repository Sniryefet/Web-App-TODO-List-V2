

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TaskSchema= new Schema({
    name:{type: String, required:true}

});

const Model = mongoose.model("TodoList",TaskSchema);
module.exports = Model;
