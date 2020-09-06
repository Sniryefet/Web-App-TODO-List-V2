const mongoose = require("mongoose");

const URI = "mongodb+srv://snir:yefet@cluster0.3l0qy.mongodb.net/todo?retryWrites=true&w=majority";

exports.connectToMongo = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{console.log("Connected to MongoDB");});
  
};
