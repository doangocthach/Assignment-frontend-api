const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getProducts,
  addProduct,
  getProduct,
} = require("../product/product.service");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
  }
};

const upload = multer({ storage, fileFilter });
// var upload = multer({ storage: storage }).array("file");

router.get("/getProducts", async (req, res, next) => {
  // const { limit, page } = req.body;
  const limit = Number.parseInt(req.query.limit) || 10;
  const page = Number.parseInt(req.query.page) || 1;
  const from = Number.parseInt(req.query.from) || 0;
  const to = Number.parseInt(req.query.to) || 1000000000000;
  const searchString = req.query.searchString || "";
  // const qr = new RegExp(searchString, "i");
  try {
    const products = await getProducts(page, limit, from, to, searchString);
    res.send(products);
  } catch (e) {
    res.send(e.message);
  }
});

router.get("/product-detail/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await getProduct(id);
    product ? res.send(product) : res.status(404).send("Not found!");
  } catch (e) {
    res.send(e.message);
  }
});

router.post("/insertProduct", upload.array("files"), async (req, res, next) => {
  const {
    productName,
    description,
    price,
    category,
    size,
    color,
    quantity,
  } = req.body;
  console.log(req.files);
  const result = await addProduct(
    productName,
    description,
    price,
    category,
    size.split(","),
    color.split(","),
    quantity.split(","),
    req.files
  );
  res.send(result);
});

module.exports = router;
