const express = require("express");

const userControllers = require("../controllers/user");
const authorization = require("../middleware/auth");

const router = express.Router();

router.post("/signup", userControllers.signup);

router.post("/login", userControllers.login);

router.get("/user-details", authorization, userControllers.getDetails);

module.exports = router;
