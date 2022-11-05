const express = require("express");
const upload = require("../../middlewares/upload");
const ctrl = require("../../controllers/users");
const auth = require("../../middlewares/auth");

const router = express.Router();
router.get("/current", auth, ctrl.getCurrent);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.updateAvatar);
module.exports = router;
