require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const product = require("./routers/product");
const cors = require("cors");
const mongooseConnect = require("./routers/mongoConnect");
const main = async () => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
  app.use(express.static("uploads"));
  const connect = await mongooseConnect();
  app.use("/product", product);
  app.get("/", (req, res) => {
    res.send("working...");
  });
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`server running in port ${port}...`);
  });
};

main();
