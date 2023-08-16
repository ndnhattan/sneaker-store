const router = require("express").Router();
const controller = require("../controllers/product");

router.get("/", controller.getProducts);
router.get("/:slug", controller.getProduct);

module.exports = router;
