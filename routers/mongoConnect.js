const mongoose = require("mongoose");
const dbName = process.env.DB_NAME;
const url = `mongodb://127.0.0.1:27017/${dbName}`;

const connect = async () => {
  try {
    await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connected!");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = connect;
