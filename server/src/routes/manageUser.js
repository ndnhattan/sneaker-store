const router = require("express").Router();
const controller = require("../controllers/manageUser");
const { verifyAccessToken, verifyAdmin } = require("../middlewares/auth");

router.get("/all", [verifyAccessToken, verifyAdmin], controller.getAllUsers);
router.delete("/:id", [verifyAccessToken, verifyAdmin], controller.deleteUser);
router.put("/:id", [verifyAccessToken, verifyAdmin], controller.updateUser);

module.exports = router;
