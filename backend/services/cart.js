const User = require("../models/user");

const addToCart = (userId, productId, quantity) => {
  return User.findByIdAndUpdate(
    { _id: userId },
    { $push: { cart: { product: productId, quantity: quantity } } }
  );
};

const deleteFromCart = (userId, productId) => {
  return User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { cart: { product: productId } } }
  );
};

const inCart = (userId, productId) => {
  return User.findOne({ _id: userId, "cart.product": productId }).select(
    "cart -_id"
  );
};

const incrementQuantity = (userId, productId, q) => {
  return User.updateOne(
    { _id: userId, "cart.product": productId },
    {
      cart: {
        product: productId,
        quantity: q + 1,
      },
    }
  );
};

const getCartProducts = (userId) => {
  return User.findOne({ _id: userId })
    .select("cart -_id")
    .populate("cart.product");
};

module.exports = {
  addToCart,
  deleteFromCart,
  inCart,
  incrementQuantity,
  getCartProducts,
};
