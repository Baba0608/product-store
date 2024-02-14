const bcrypt = require("bcrypt");

const generateToken = require("../utils/generate-jwt");
const AdminServices = require("../services/admin");

const adminSignup = async (req, res, next) => {
  try {
    const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;
    const { adminSecretKey, username, email, password } = req.body;

    const admin = await AdminServices.findAdmin(email);

    if (admin) {
      return res
        .status(200)
        .json({ success: false, message: "Admin already exists." });
    }

    if (adminSecretKey === ADMIN_SECRET_KEY) {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Something went wrong." });
        }

        await AdminServices.createAdmin(username, email, hash);

        return (
          res.status(201),
          json({ success: true, message: "Admin created successfully." })
        );
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Admin secret key is not valid." });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await AdminServices.findAdmin(email);

    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "You dont have admin access." });
    }

    bcrypt.compare(password, admin.password, (err, result) => {
      if (err) {
        return res.status(500).json({ success: false });
      }

      if (result) {
        return res.status(200).json({
          success: true,
          message: "Admin logged in succesfully.",
          token: generateToken(admin._id, admin.username),
        });
      } else {
        return res
          .status(401)
          .json({ success: false, message: "Password didn't match" });
      }
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong." });
  }
};

const getAdminList = async (req, res, next) => {
  try {
    const admins = await AdminServices.getAdminList();
    return res.status(200).json({ success: true, admins });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: true, message: " Something went wrong." });
  }
};

module.exports = { adminLogin, adminSignup, getAdminList };
