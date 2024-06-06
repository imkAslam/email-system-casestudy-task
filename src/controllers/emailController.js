const Email = require("../models/EmailSchema");
const User = require("../models/UserSchema");
const {
  syncOutlookEmails,
  sendOutlookEmail,
  findAllEmails,
} = require("../services/outlookService");

const syncOutlookEmailsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user || !user.outlook.accessToken) {
      return res
        .status(400)
        .json({ error: "User not found or Outlook not linked" });
    }
    await syncOutlookEmails(user.outlook.accessToken, userId);
    res.json({ message: "Outlook emails synced successfully" });
  } catch (error) {
    console.error("Error syncing Outlook emails:", error);
    res.status(500).json({ error: "Failed to sync emails" });
  }
};

const sendOutlookEmailForUser = async (req, res) => {
  const { userId } = req.params;
  const { subject, body, to } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user || !user.outlookAccessToken) {
      return res
        .status(400)
        .json({ error: "User not found or Outlook not linked" });
    }

    await sendOutlookEmail(user.outlookAccessToken, { subject, body, to });
    res.json({ message: "Outlook email sent successfully" });
  } catch (error) {
    console.error("Error sending Outlook email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

const flagOutlookEmail = async (req, res) => {
  const { emailId } = req.params;
  try {
    const email = await Email.findById(emailId);
    if (!email || email.provider !== "outlook") {
      return res
        .status(400)
        .json({ error: "Email not found or not an Outlook email" });
    }

    email.isFlagged = true;
    await email.save();
    res.json({ message: "Outlook email flagged successfully" });
  } catch (error) {
    console.error("Error flagging Outlook email:", error);
    res.status(500).json({ error: "Failed to flag email" });
  }
};

const getAllEmails = async (_req, res) => {
  try {
    const emails = await findAllEmails();
    // console.log(emails);
    res
      .status(200)
      .json({ message: "Response received successfully", data: emails });
  } catch (error) {
    res.status(500).json({ error: "Failed to get emails" });
  }
};

module.exports = {
  syncOutlookEmailsForUser,
  sendOutlookEmailForUser,
  flagOutlookEmail,
  getAllEmails,
};
