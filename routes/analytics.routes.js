const express = require("express");
const { data ,defaultRoute} = require("../controller/analytics.controller.js");

let router = express.Router();
router.get("/data", data);
router.get("/", defaultRoute);

module.exports = router;
