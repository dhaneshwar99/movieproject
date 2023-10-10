const mongoose = require("mongoose");

const dbName = process.env.MONGODB_DB;
const mongo_url = process.env.MONGODB_CONNECTION_URL + dbName;
module.exports.initialize = (result) => {
  mongoose
    .connect(mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      result();
    })
    .catch((err) => {
      console.log(err);
      result(err);
    });
  mongoose.Promise = global.Promise;
};
