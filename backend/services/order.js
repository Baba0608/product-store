const Order = require("../models/order");

const createOrder = (userId, orderId, products) => {
  return Order.create({
    orderId: orderId,
    userId: userId,
    products,
    paymentId: null,
    amount: null,
    paymentStatus: "PENDING",
  });
};

const updatePaymentStatus = (orderId, paymentId, amount) => {
  return Order.findOneAndUpdate(
    { orderId: orderId },
    {
      paymentId: paymentId ? paymentId : null,
      paymentStatus: paymentId ? "SUCCESS" : "FAILURE",
      amount: amount ? amount : null,
    }
  );
};

module.exports = {
  createOrder,
  updatePaymentStatus,
};
