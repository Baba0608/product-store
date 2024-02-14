const express = require("express");

const adminControllers = require("../controllers/admin");
const adminAuthentication = require("../middleware/admin-auth");

const router = express.Router();

router.post("/admin-signup", adminControllers.adminSignup);

router.post("/admin-login", adminControllers.adminLogin);

router.get("/admin-list", adminAuthentication, adminControllers.getAdminList);

module.exports = router;
