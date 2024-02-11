const express = require("express");
const multer = require("multer");
const upload = multer();

const productControllers = require("../controllers/product");

const adminAuthentication = require("../middleware/admin-auth");

const router = express.Router();

router.post(
  "/add-product",
  upload.single("image"),
  adminAuthentication,
  productControllers.addProduct
);

router.get("/all-products", productControllers.getAllProducts);

router.patch(
  "/update-details/:productId",
  adminAuthentication,
  productControllers.updateProductDetails
);

router.delete(
  "/delete-product/:productId",
  adminAuthentication,
  productControllers.deleteProduct
);

router.get("/:productId", productControllers.getSingleProduct);

module.exports = router;
