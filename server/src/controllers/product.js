const asyncHandler = require("express-async-handler");
const Product = require("../models/product");
const { parseQueryProducts } = require("../utils/parseQueryKeywords");

const getProducts = asyncHandler(async (req, res) => {
  const queryObj = { ...req.query };
  const excludedFields = [
    "page",
    "sort",
    "limit",
    "fields",
    "sizes",
    "brands",
    "title",
  ];
  excludedFields.forEach((el) => delete queryObj[el]);

  // 1) Filtering
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  // +) Sizes
  if (req.query.sizes) {
    const sizes = req.query.sizes.split(",");
    queryString =
      queryString[1] === "}"
        ? `{"sizes":{"$in":[${sizes}]}}`
        : queryString.slice(0, queryString.length - 1) +
          `,"sizes":{"$in":[${sizes}]}}`;
  }
  // +) Brands
  if (req.query.brands) {
    const brands = req.query.brands
      .split(",")
      .map((item) => `"${item.toLowerCase()}"`);
    queryString =
      queryString[1] === "}"
        ? `{"brand":{"$in":[${brands}]}}`
        : queryString.slice(0, queryString.length - 1) +
          `,"brand":{"$in":[${brands}]}}`;
  }
  // +) Title
  if (req.query.title) {
    const title = parseQueryProducts(req.query.title);
    queryString =
      queryString[1] === "}"
        ? `{${title}}`
        : queryString.slice(0, queryString.length - 1) + `,${title}}`;
  }

  const total = await Product.find(JSON.parse(queryString)).countDocuments();
  let query = Product.find(JSON.parse(queryString));

  // 2) Sorting
  if (req.query.sort) {
    const sortBy = req.query.sort.split(",");
    sortBy.push("-stock");
    if (!sortBy.includes("-createdAt")) sortBy.push("-createdAt");
    query = query.sort(sortBy.join(" "));
  } else {
    if (req.query.brands) {
      query = query.sort("brand -stock -createdAt");
    } else query = query.sort("-stock -createdAt");
  }

  //3) Field Limiting
  if (req.query.fields) {
    const fields = req.query.fields.split(",").join(" ");
    query = query.select(fields);
  } else {
    query = query.select("-__v");
  }

  // 4) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);
  //EXECUTE QUERY
  const data = await query;
  res.status(200).json({
    message: data ? "Success" : "Cannot get products",
    total,
    data,
  });
});

const getProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const data = await Product.findOne({ slug });
  return res.status(200).json({
    message: data ? "Success" : "Cannot get product",
    //total: data.length,
    data,
  });
});

module.exports = {
  getProducts,
  getProduct,
};
