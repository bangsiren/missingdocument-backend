const mongoose = require("mongoose");
const uri = "mongodb+srv://bangsir:bangsiren1999@cluster0.x8pxu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (er) => {
    if (!er) {
      console.log("Successfully Connected To Database");
    } else {
      console.log("Failed To Connect TO Database");
    }
  }
);

module.exports = mongoose;
