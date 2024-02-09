const User = require("../models/user");

const createUser = (username, email, password) => {
  return User.create({
    username: username,
    email: email,
    password: password,
    cart: [],
  });
};

const findUser = (email) => {
  return User.findOne({ email: email }).select("password");
};

const getDetails = (userId) => {
  return User.findOne({ _id: userId })
    .select("username cart -_id")
    .populate("cart.productId");
};

module.exports = { createUser, findUser, getDetails };
