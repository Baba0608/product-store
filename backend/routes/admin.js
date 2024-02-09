const express = require("express");

const adminControllers = require("../controllers/admin");

const router = express.Router();

router.post("/admin-signup", adminControllers.adminSignup);

router.post("/admin-login", adminControllers.adminLogin);

module.exports = router;
