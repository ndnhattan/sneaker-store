const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const sendMail = require("../utils/sendMail");
const { generateToken, verifyToken } = require("../utils/jwt");

const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || password.length < 6) {
    res.statusCode = 400;
    throw new Error("Missing inputs");
  }

  const user = await User.findOne({ email });
  if (user) {
    res.statusCode = 400;
    throw new Error("An account is already registered with your email address");
  } else {
    const token = generateToken({ ...req.body }, "10m");
    const html = `Xin vui lòng click vào link dưới đây để xác thực email của bạn. Link này sẽ hết hạn sau 10 phút kể từ bây giờ. <a href=${process.env.SERVER_URL}/api/user/verify-register/${token}>Click here</a>`;
    const info = await sendMail({ email, html });
    return res.status(200).json({
      message: info ? "Success" : "Cannot send email",
      data: null,
    });
  }
});

const verifyRegister = asyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token) {
    res.statusCode = 400;
    throw new Error("Missing inputs");
  }

  const data = verifyToken(token, (err, decode) => {
    if (err)
      return res.redirect(`${process.env.CLIENT_URL}/user/login?message=-1`);
    return decode;
  });
  const { firstName, lastName, email, password } = data;
  const userCheck = await User.findOne({ email });
  if (userCheck) {
    return res.redirect(`${process.env.CLIENT_URL}/user/login?message=0`);
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    loginType: "normal",
  });

  return res.redirect(`${process.env.CLIENT_URL}/user/login?message=1`);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.statusCode = 400;
    throw new Error("Missing inputs");
  }

  const user = await User.findOne({ email });
  if (user && (await user.isCorrectPassword(password))) {
    const accessToken = generateToken({ _id: user._id, role: user.role }, "5m");

    const newRefreshToken = generateToken({ _id: user._id }, "30d");
    await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Success",
      data: { accessToken },
    });
  } else {
    res.statusCode = 400;
    throw new Error("Invalid credentials!");
  }
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.params;
  if (!email) {
    res.statusCode = 400;
    throw new Error("Missing email");
  }

  const user = await User.findOne({ email });
  if (!user) {
    res.statusCode = 400;
    throw new Error("User not found");
  } else {
    const token = generateToken({ email }, "10m");
    const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 10 phút kể từ bây giờ. <a href=${process.env.CLIENT_URL}/user/forgot-password?token=${token}>Click here</a>`;
    const info = await sendMail({ email, html });
    return res.status(200).json({
      message: info ? "Success" : "Cannot send email",
      data: null,
    });
  }
});

const verifyForgotPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    res.statusCode = 400;
    throw new Error("Missing inputs");
  }

  const data = verifyToken(token, (err, decode) => {
    if (err) {
      res.statusCode = 400;
      throw new Error("Invalid token");
    }
    return decode;
  });
  const { email } = data;
  const user = await User.findOne({ email });
  if (!user) {
    res.statusCode = 400;
    throw new Error("Invalid email");
  }
  user.password = password;
  await user.save();

  return res.status(200).json({
    message: "Success",
    data: null,
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    res.statusCode = 400;
    throw new Error("No refresh token");
  }

  const data = verifyToken(refreshToken, (err, decode) => {
    if (err) {
      res.statusCode = 400;
      throw new Error("Invalid token");
    }
    return decode;
  });
  const user = await User.findOne({ _id: data._id, refreshToken });

  const timeExpire = Math.round(data.exp - new Date().getTime() / 1000);
  const newRefreshToken = generateToken(
    { _id: user._id },
    `${timeExpire * 1000}`
  );
  await User.findByIdAndUpdate(user._id, { refreshToken: newRefreshToken });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: timeExpire * 1000,
  });

  return res.status(200).json({
    message: "Success",
    data: {
      accessToken: generateToken({ _id: user._id, role: user.role }, "5m"),
    },
  });
});

const logout = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate({ _id }, { refreshToken: "" });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });

  return res.status(200).json({
    message: "Success",
    data: null,
  });
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw new Error("User not found");
  }
  const { refreshToken, role, password, ...data } = user.toObject();

  return res.status(200).json({
    message: "Success",
    data,
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { email, firstName, lastName, oldPassword, newPassword, mobile } =
    req.body;
  if (
    !email ||
    !firstName ||
    !lastName ||
    !mobile ||
    (oldPassword && newPassword.length < 6)
  ) {
    res.status(400);
    throw new Error("Missing inputs");
  }
  const user = await User.findById(_id);
  if (user) {
    if (!oldPassword) {
      if (!user.loginType.includes("normal")) user.password = newPassword;
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.mobile = mobile;
      await user.save();
      const { refreshToken, role, password, ...data } = user.toObject();

      return res.status(200).json({
        message: "Success",
        data,
      });
    } else if (await user.isCorrectPassword(oldPassword)) {
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.password = newPassword;
      user.mobile = mobile;
      await user.save();
      const { refreshToken, role, password, ...data } = user.toObject();

      return res.status(200).json({
        message: "Success",
        data,
      });
    } else {
      res.status(400);
      throw new Error("Mật khẩu không đúng");
    }
  } else {
    throw new Error("User not found");
  }
});

const updateAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { province, district, ward, address } = req.body;
  if (!province || !district || !ward || !address) {
    res.status(400);
    throw new Error("Missing inputs");
  }
  const user = await User.findById(_id);
  if (user) {
    user.address = req.body;
    await user.save();
    const { refreshToken, role, password, ...data } = user.toObject();

    return res.status(200).json({
      message: "Success",
      data,
    });
  } else {
    throw new Error("User not found");
  }
});

const addToCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { quantity, size, productId } = req.body;
  if (!quantity || !size || !productId) {
    res.status(400);
    throw new Error("Missing inputs");
  }

  const user = await User.findById(_id);
  const item = user.cart.find(
    (item) => item.productId.toString() === productId && item.size === size
  );
  if (quantity > 0) {
    if (item) {
      user.cart = user.cart.map((item) => {
        if (item.productId.toString() === productId && item.size === size)
          item.quantity = item.quantity + quantity;
        return item;
      });
    } else {
      user.cart.push(req.body);
    }
  } else if (quantity < 0 && item) {
    if (item.quantity <= -quantity) {
      user.cart = user.cart.filter(
        (item) => item.productId.toString() !== productId || item.size !== size
      );
    } else {
      user.cart = user.cart.map((item) => {
        if (item.productId.toString() === productId && item.size === size)
          item.quantity = item.quantity + quantity;
        return item;
      });
    }
  }
  await user.save();

  return res.status(200).json({
    message: "Success",
    data: null,
  });
});

const getDetailCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  const data = await User.findById(_id)
    .select("cart")
    .populate("cart.productId");

  return res.status(200).json({
    message: "Success",
    data,
  });
});

module.exports = {
  register,
  verifyRegister,
  login,
  forgotPassword,
  verifyForgotPassword,
  refreshAccessToken,
  logout,
  getCurrent,
  updateUser,
  updateAddress,
  addToCart,
  getDetailCart,
};
