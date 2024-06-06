const express = require("express");
const router = express.Router();
const {
  syncOutlookEmailsForUser,
  sendOutlookEmailForUser,
  flagOutlookEmail,
  getAllEmails,
} = require("../controllers/emailController");

router.get("/outlook/all", getAllEmails);
router.post("/outlook/sync/:userId", syncOutlookEmailsForUser);
router.post("/outlook/send/:userId", sendOutlookEmailForUser);
router.put("/outlook/flag/:emailId", flagOutlookEmail);

module.exports = router;
