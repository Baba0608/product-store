const express = require("express");
const multer = require("multer");
const upload = multer();

const productControllers = require("../controllers/product");

const router = express.Router();

router.post(
  "/add-product",
  upload.single("image"),
  productControllers.addProduct
);

router.get("/all-products", productControllers.getAllProducts);

router.patch(
  "/update-details/:productId",
  productControllers.updateProductDetails
);

router.delete("/delete-product/:productId", productControllers.deleteProduct);

module.exports = router;
