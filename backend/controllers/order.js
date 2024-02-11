const Razorpay = require("razorpay");

const OrderServices = require("../services/order");
const Order = require("../models/order");

const createOrder = async (req, res, next) => {
  try {
    const { products } = req.body;
    const { _id: userId } = req.user;

    const amount = products.reduce((acc, curr) => {
      acc = curr.product.cost * curr.quantity * 100;
      return acc;
    }, 0);

    const rzp = new Razorpay({
      key_id: process.env.RZP_KEY_ID,
      key_secret: process.env.RZP_KEY_SECRET,
    });

    rzp.orders.create({ amount, currency: "INR" }, async (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ success: "Something went wrong. Order not created." });
      }

      const result = await OrderServices.createOrder(
        userId,
        result.id,
        products
      );

      return res.status(201).json({
        success: true,
        message: "Order created",
        result,
        key_id: rzp.key_id,
      });
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

const updatePaymentStatus = async (req, res, next) => {
  try {
    const { orderId, paymentId, amount } = req.body;

    const result = await OrderServices.updatePaymentStatus(
      orderId,
      paymentId,
      amount
    );

    return res.status(200).json({
      success: true,
      message: `Updated payment status to ${paymentId ? "SUCCESS" : "FAILURE"}`,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

module.exports = {
  createOrder,
  updatePaymentStatus,
};
