const express = require("express");
const { data } = require("../controller/analytics.controller.js");

let router = express.Router();
router.get("/data", data);

module.exports = router;
