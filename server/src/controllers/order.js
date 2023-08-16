const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Order = require("../models/order");

const addOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { description, items, totalPrice, deliverType, paymentType } = req.body;
  if (items.length < 1) {
    res.statusCode = 400;
    throw new Error("Missing inputs");
  }

  const data = await Order.create({ user: _id, ...req.body });
  await User.findByIdAndUpdate(_id, {
    $push: { orders: { orderId: data._id } },
    cart: [],
  });

  return res.status(200).json({
    message: "Success",
    data,
  });
});

const getOrders = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const data = await User.findById(_id)
    .select("orders")
    .populate([
      {
        path: "orders.orderId",
        model: "Order",
        populate: {
          path: "items.productId",
          model: "Product",
        },
      },
    ]);

  return res.status(200).json({
    message: "Success",
    data,
  });
});

module.exports = {
  addOrder,
  getOrders,
};
