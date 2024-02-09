const express = require("express");

const cartController = require("../controllers/cart");
const authorization = require("../middleware/auth");

const router = express.Router();

router.post("/add-to-cart", authorization, cartController.addToCart);

router.delete(
  "/delete-from-cart/:productId",
  authorization,
  cartController.deleteFromCart
);

router.get("/get-products", authorization, cartController.getCartProducts);

module.exports = router;
