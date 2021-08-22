const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI ? process.env.MONGODB_URI : "mongodb://localhost:27017/UserDatabase";
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
