const router = require("express").Router();
const controller = require("../controllers/user");
const { verifyAccessToken, verifyAdmin } = require("../middlewares/auth");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.put("/verify-forgot-password", controller.verifyForgotPassword);
router.put("/refresh-access-token", controller.refreshAccessToken);
router.get("/", verifyAccessToken, controller.getCurrent);
router.put("/", verifyAccessToken, controller.updateUser);
router.put("/address", verifyAccessToken, controller.updateAddress);
router.get("/logout", verifyAccessToken, controller.logout);
router.get("/forgot-password/:email", controller.forgotPassword);
router.get("/verify-register/:token", controller.verifyRegister);

router.post("/add-to-cart", verifyAccessToken, controller.addToCart);
router.get("/detail-cart", verifyAccessToken, controller.getDetailCart);

module.exports = router;
