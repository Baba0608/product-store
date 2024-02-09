const jwt = require("jsonwebtoken");

const Admin = require("../models/admin");

const adminAuthentication = async (req, res, next) => {
  try {
    // const token = req.headers.token;

    const token = req.headers.authorization;

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, userObj) => {
      if (err) {
        // console.log(err);
        throw new Error("Something went wrong.");
      }

      const admin = await Admin.findOne({ _id: userObj.id }).select("email");

      if (admin) {
        req.admin = admin;
        next();
      } else {
        return res.status(404).json({ message: "You dont have admin access" });
      }

      //   console.log(user);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err });
  }
};

module.exports = adminAuthentication;
