const express = require('express');
const router = express.Router();
const meetingsController = require("../controllers/meetings.controller");

router.get("/", meetingsController.index);
router.post("/create", meetingsController.create);
router.post("/pre-join",meetingsController.preJoin);
router.post("/join",meetingsController.join);
router.delete("/exit", meetingsController.exit);

module.exports = router;
