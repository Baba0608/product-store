const Admin = require("../models/admin");

const findAdmin = (email) => {
  return Admin.findOne({ email: email }).select("password");
};

const createAdmin = (userName, email, password) => {
  return Admin.create({
    username: userName,
    email: email,
    password: password,
  });
};

module.exports = { findAdmin, createAdmin };
