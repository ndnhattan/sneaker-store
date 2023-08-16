const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const { parseQueryUsers } = require("../utils/parseQueryKeywords");

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await Product.findByIdAndDelete(id);

  res.status(200).json({
    message: "Success",
    data: null,
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    code,
    title,
    brand,
    model,
    color,
    price,
    salePrice,
    sold,
    stock,
    sizes,
    description,
    imagesUrl,
  } = req.body;
  if (
    !code ||
    !title ||
    !brand ||
    !model ||
    !color ||
    !price ||
    !salePrice ||
    !sold ||
    !stock ||
    !sizes ||
    !imagesUrl
  ) {
    res.status(400);
    throw new Error("Missing inputs");
  }
  const product = await Product.findById(id);
  product.code = code;
  product.title = title;
  product.brand = brand;
  product.model = model;
  product.color = color;
  product.price = price;
  product.salePrice = salePrice;
  product.sold = sold;
  product.stock = stock;
  product.sizes = sizes;
  product.description = description;
  product.imagesUrl = imagesUrl;
  await product.save();

  res.status(200).json({
    message: "Success",
    data: null,
  });
});

const uploadImages = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Success",
    data: req.files.map((item) => item.path),
  });
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    code,
    title,
    brand,
    model,
    color,
    price,
    salePrice,
    sold,
    stock,
    sizes,
    description,
    imagesUrl,
  } = req.body;
  if (
    !code ||
    !title ||
    !brand ||
    !model ||
    !color ||
    !price ||
    !salePrice ||
    !sold ||
    !stock ||
    !sizes ||
    !imagesUrl
  ) {
    res.status(400);
    throw new Error("Missing inputs");
  }
  await Product.create(req.body);

  res.status(200).json({
    message: "Success",
    data: null,
  });
});

module.exports = {
  deleteProduct,
  updateProduct,
  uploadImages,
  createProduct,
};
