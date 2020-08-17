const mongoose = require("mongoose");

module.exports = mongoose.model(
  "product",
  {
    productName: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    image: [],
    category: {
      type: String,
      default: "unisex",
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
    detail: [
      {
        size: {
          type: String,
        },
        color: {
          type: String,
        },
        quantity: {
          type: Number,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  "product"
);
