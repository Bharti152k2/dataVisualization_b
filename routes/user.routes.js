const express = require("express");
const {
  signUp,
  login,
  defaultRoute,
} = require("../controller/user.controller");
const { data } = require("../controller/analytics.controller");

let router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.get("/", defaultRoute);
// router.get("/userdata", userData);
// router.delete("/logout", logout);

module.exports = router;
