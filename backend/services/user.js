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
  return User.findOne({ email: email });
};

exports.createUser = createUser;
exports.findUser = findUser;
