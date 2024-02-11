const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    require: true,
  },

  paymentId: {
    type: String,
    require: true,
  },

  paymentStatus: {
    type: String,
    require: true,
  },

  products: [
    {
      _id: false,
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],

  amount: {
    type: Number,
    require: true,
  },
});

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
