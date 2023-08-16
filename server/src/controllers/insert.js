const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const data = require("../../../data/products.json");

const fn = async (product) => {
  await Product.create({
    title: product?.name,
    brand: product?.name?.split(" ")[0],
    model: product?.name
      ?.split(" -")[0]
      .slice(product?.name?.split(" ")[0].length + 1),
    color: product?.name?.split("- ")[1],
    stock: Math.round(Math.random() * 100),
    sold: Math.round(Math.random() * 100),
    price: +product?.price?.split(/[.₫]/).join(""),
    imagesUrl: product?.image?.map((item) => item["image-src"]),
    sizes: product?.size?.map((item) => +item.size),
    code: product?.masp?.split(" ")[1],
  });
};

const insertProduct = asyncHandler(async (req, res) => {
  const promises = [];
  for (let product of data) promises.push(fn(product));
  await Promise.all(promises);

  return res.send("Done");
});

module.exports = {
  insertProduct,
};
