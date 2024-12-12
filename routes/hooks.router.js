const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const hooksController = require("../controllers/hooks.controller");

router.post("/api-hook", hooksController.api);


module.exports = router;
