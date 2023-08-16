const jwt = require("jsonwebtoken");

const generateToken = (data, expiresIn) =>
  jwt.sign(data, process.env.JWT_SECRET, { expiresIn });

const verifyToken = (token, func) =>
  jwt.verify(token, process.env.JWT_SECRET, (err, decode) => func(err, decode));

module.exports = { generateToken, verifyToken };
