const User = require("../models/user");

const addToCart = (userId, productId, quantity) => {
  return User.findByIdAndUpdate(
    { _id: userId },
    { $push: { cart: { productId: productId, quantity: quantity } } }
  );
};

const deleteFromCart = (userId, productId) => {
  return User.findByIdAndUpdate(
    { _id: userId },
    { $pull: { cart: { productId: productId } } }
  );
};

module.exports = { addToCart, deleteFromCart };
