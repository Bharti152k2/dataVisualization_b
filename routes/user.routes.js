const express = require("express");
const { signUp, login, logout } = require("../controller/user.controller");

let router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
// router.get("/userdata", userData);
// router.delete("/logout", logout);

module.exports = router;
