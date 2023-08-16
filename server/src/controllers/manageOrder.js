const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const User = require("../models/user");
const { parseQueryOrders } = require("../utils/parseQueryKeywords");

const getAllOrders = asyncHandler(async (req, res) => {
  let queryString = "{}";
  if (req.query.title) {
    const title = parseQueryOrders(req.query.title);
    queryString = `{${title}}`;
  }

  const total = await Order.find(JSON.parse(queryString)).countDocuments();
  let query = Order.find(JSON.parse(queryString))
    .sort("-createdAt")
    .populate("items.productId");

  // +) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  //EXECUTE QUERY
  const data = await query;
  res.status(200).json({
    message: data ? "Success" : "Cannot get users",
    total,
    data,
  });
});

const deleteOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findByIdAndDelete(id);
  const user = await User.findById(order.user);
  const index = user.orders.indexOf(id);
  user.orders = user.orders.splice(index, 1);
  await user.save();

  res.status(200).json({
    message: "Success",
    data: null,
  });
});

const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, deliverType, paymentType, description } = req.body;
  if (!status || !deliverType || !paymentType) {
    res.status(400);
    throw new Error("Missing inputs");
  }
  await Order.findByIdAndUpdate(id, req.body);
  res.status(200).json({
    message: "Success",
    data: null,
  });
});

module.exports = {
  getAllOrders,
  deleteOrder,
  updateOrder,
};
