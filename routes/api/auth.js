const express = require("express");

const ctrl = require("../../controllers/auth");

const router = express.Router();

router.post("/register", ctrl.register)

module.exports = router;