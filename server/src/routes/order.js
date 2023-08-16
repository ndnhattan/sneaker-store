const router = require("express").Router();
const controller = require("../controllers/order");
const { verifyAccessToken, verifyAdmin } = require("../middlewares/auth");

router.post("/", verifyAccessToken, controller.addOrder);
router.get("/", verifyAccessToken, controller.getOrders);

module.exports = router;
