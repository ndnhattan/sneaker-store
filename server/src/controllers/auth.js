const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");

const loginGoogle = asyncHandler(async (req, res) => {
  const firstName = req.user.name.givenName;
  const lastName = req.user.name.familyName;
  const email = req.user.emails[0].value;
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      firstName,
      lastName,
      email,
      loginType: "google",
    });
  }
  if (!user.loginType.includes("google")) {
    user.loginType.push("google");
    await user.save();
  }
  const accessToken = generateToken({ _id: user._id, role: user.role }, "5m");
  const newRefreshToken = generateToken({ _id: user._id }, "30d");
  await User.findByIdAndUpdate(user._id, {
    refreshToken: newRefreshToken,
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
  return res.redirect(
    `${process.env.CLIENT_URL}/user/oauth-login?accessToken=${accessToken}`
  );
});

const loginFacebook = asyncHandler(async (req, res) => {
  const firstName = req.user.displayName.slice(
    req.user.displayName.indexOf(" ") + 1
  );
  const lastName = req.user.displayName.split(" ")[0];
  // const email = req.user.emails[0].value;
  console.log(req.user);
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      firstName,
      lastName,
      email,
      loginType: "facebook",
    });
  }
  const accessToken = generateToken({ _id: user._id, role: user.role }, "5m");
  const newRefreshToken = generateToken({ _id: user._id }, "30d");
  await User.findByIdAndUpdate(user._id, {
    refreshToken: newRefreshToken,
  });
  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
  return res.redirect(
    `${process.env.CLIENT_URL}/user/oauth-login?accessToken=${accessToken}`
  );
});

module.exports = {
  loginGoogle,
  loginFacebook,
};
