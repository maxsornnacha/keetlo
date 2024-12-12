const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const usersController = require("../controllers/users.controller");

router.get("/status", usersController.status);
router.post("/signup", usersController.signup);
router.post("/signin", usersController.signin);
router.get("/logout", usersController.logout);

router.post("/update-profile", usersController.updateProfile);
router.get("/meeting-history", usersController.meetingHistory);
router.get("/meeting-stats", usersController.meetingStats);

module.exports = router;
