const router = require("express").Router();
const controller = require("../controllers/insert");

router.post("/", controller.insertProduct);

module.exports = router;
