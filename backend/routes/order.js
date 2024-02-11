const express = require("express");

const userAuthentication = require("../middleware/auth");
const orderControllers = require("../controllers/order");

const router = express.Router();

router.post("/create-order", userAuthentication, orderControllers.createOrder);

router.post(
  "/update-payment-status",
  userAuthentication,
  orderControllers.updatePaymentStatus
);

module.exports = router;
