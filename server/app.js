const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./src/configs/db");
const initRoutes = require("./src/routes");

const app = express();
const port = process.env.PORT || 7000;

app.use(
  cors({
    origin: "*",
    headers: ["Content-Type"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();
initRoutes(app);

app.listen(port, console.log(`😎 Server listening on port ${port}`));
