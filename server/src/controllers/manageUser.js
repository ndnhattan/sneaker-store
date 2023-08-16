const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { parseQueryUsers } = require("../utils/parseQueryKeywords");

const getAllUsers = asyncHandler(async (req, res) => {
  let queryString = "{}";
  if (req.query.title) {
    const title = parseQueryUsers(req.query.title);
    queryString = `{${title}}`;
  }

  const total = await User.find(JSON.parse(queryString)).countDocuments();
  let query = User.find(JSON.parse(queryString)).sort("-createdAt");

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

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.status(200).json({
    message: "Success",
    data: null,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, firstName, lastName, role, mobile } = req.body;
  if (!email || !firstName || !lastName || !role) {
    res.status(400);
    throw new Error("Missing inputs");
  }
  if (mobile) {
    await User.findByIdAndUpdate(id, {
      email,
      firstName,
      lastName,
      mobile,
      role,
    });
  } else {
    await User.findByIdAndUpdate(id, {
      email,
      firstName,
      lastName,
      role,
    });
  }
  res.status(200).json({
    message: "Success",
    data: null,
  });
});

module.exports = {
  getAllUsers,
  deleteUser,
  updateUser,
};
