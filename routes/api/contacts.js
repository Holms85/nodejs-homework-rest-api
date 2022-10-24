const express = require("express");

const ctrl = require("../../controllers/contacts");

const auth = require("../../middlewares/auth")

const router = express.Router();

router.get("/", auth, ctrl.getAll);

router.get("/:id", ctrl.getById);

router.post("/", auth, ctrl.add);

router.put("/:id", ctrl.updateById);

router.patch("/:id/favorite", ctrl.updateFavorite);

router.delete("/:id", ctrl.deleteContact);

module.exports = router;
