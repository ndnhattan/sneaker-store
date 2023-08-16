const { verifyToken } = require("../utils/jwt");

const verifyAccessToken = (req, res, next) => {
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    const token = req.headers.authorization.split(" ")[1];
    verifyToken(token, (err, decode) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid access token");
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401);
    throw new Error("Require authentication");
  }
};

const verifyAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role !== "tanbasa") {
    res.status(403);
    throw new Error("Require admin role");
  }
  next();
};

module.exports = {
  verifyAccessToken,
  verifyAdmin,
};
