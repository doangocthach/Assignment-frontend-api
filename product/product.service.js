const productModel = require("./product.model");

const getProducts = async (page, limit, from, to, searchString) => {
  if (page === 1) {
    page = 0;
  }
  const qr = new RegExp(searchString, "i");
  return await productModel
    .find({
      $or: [{ productName: qr }, { category: qr }],
      price: { $gte: from, $lte: to },
    })
    .skip(page * limit)
    .limit(limit)
    .sort({ _id: -1 })
    .lean();
};
const getProduct = async (id) => {
  return await productModel.findById(id).lean();
};
const addProduct = async (
  productName,
  description,
  price,
  category,
  size,
  color,
  quantity,
  files
) => {
  const detail = [];
  const images = [];
  files.forEach((file) => {
    images.push(file.filename);
  });

  // check multiple detail
  if (Array.isArray(size) && Array.isArray(color) & Array.isArray(quantity)) {
    for (let i = 0; i < size.length; i++) {
      if (size[i] && color[i] && quantity[i]) {
        detail[i] = {
          size: size[i],
          color: color[i],
          quantity: Number.parseInt(quantity[i]),
        };
      }
    }
  }
  console.log(detail);
  const product = await productModel.create({
    productName: productName,
    price: price,
    description: description,
    category: category,
    image: files,
    detail: detail,
  });
  return product;
};

module.exports = { getProducts, addProduct, getProduct };
