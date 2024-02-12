const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    orderId: {
      type: String,
      require: true,
    },
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

    products: [],

    amount: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
