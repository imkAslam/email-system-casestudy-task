const express = require("express");
const router = express.Router();
const {
  getOutlookAuthUrl,
  handleOutlookCallback,
} = require("../controllers/authController");

router.get("/outlook", getOutlookAuthUrl);
router.get("/outlook/callback", handleOutlookCallback);

module.exports = router;
