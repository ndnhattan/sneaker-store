const router = require("express").Router();
const controller = require("../controllers/manageOrder");
const { verifyAccessToken, verifyAdmin } = require("../middlewares/auth");

router.get("/all", [verifyAccessToken, verifyAdmin], controller.getAllOrders);
router.delete("/:id", [verifyAccessToken, verifyAdmin], controller.deleteOrder);
router.put("/:id", [verifyAccessToken, verifyAdmin], controller.updateOrder);

module.exports = router;
