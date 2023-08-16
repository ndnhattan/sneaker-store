const router = require("express").Router();
const controller = require("../controllers/manageProduct");
const { verifyAccessToken, verifyAdmin } = require("../middlewares/auth");
const uploader = require("../configs/cloudinary.config");

router.post(
  "/upload-images",
  [verifyAccessToken, verifyAdmin],
  uploader.array("images"),
  controller.uploadImages
);
router.post("/", [verifyAccessToken, verifyAdmin], controller.createProduct);
router.delete(
  "/:id",
  [verifyAccessToken, verifyAdmin],
  controller.deleteProduct
);
router.put("/:id", [verifyAccessToken, verifyAdmin], controller.updateProduct);

module.exports = router;
