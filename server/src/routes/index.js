const insertRouter = require("./insert");
const productRouter = require("./product");
const userRouter = require("./user");
const orderRouter = require("./order");
const authRouter = require("./auth");
const manageUserRouter = require("./manageUser");
const manageProductRouter = require("./manageProduct");
const manageOrderRouter = require("./manageOrder");
const { notFound, errorHandler } = require("../middlewares/error");

const initRoutes = (app) => {
  app.use("/api/insert", insertRouter);
  app.use("/api/product", productRouter);
  app.use("/api/user", userRouter);
  app.use("/api/order", orderRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/manage-user", manageUserRouter);
  app.use("/api/manage-product", manageProductRouter);
  app.use("/api/manage-order", manageOrderRouter);

  app.use(notFound);
  app.use(errorHandler);
};

module.exports = initRoutes;
