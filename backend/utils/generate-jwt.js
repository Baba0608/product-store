const JWT = require("jsonwebtoken");

const generateToken = (id, name) =>
  JWT.sign({ id, name }, process.env.JWT_SECRET_KEY);

module.exports = generateToken;
