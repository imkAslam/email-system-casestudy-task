const { google } = require("googleapis");
const Email = require("../models/EmailSchema");

const syncEmails = async (user) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: user.gmailToken });
  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  const response = await gmail.users.messages.list({ userId: "me" });

  for (const message of response.data.messages) {
    const details = await gmail.users.messages.get({
      userId: "me",
      id: message.id,
    });
    const subject = details.data.payload.headers.find(
      (h) => h.name === "Subject"
    ).value;
    const from = details.data.payload.headers.find(
      (h) => h.name === "From"
    ).value;
    const to = details.data.payload.headers.find((h) => h.name === "To").value;

    await Email.findOneAndUpdate(
      { user: user._id, provider: "gmail", subject },
      {
        from,
        to,
        body: details.data.snippet,
        date: new Date(details.data.internalDate),
      },
      { upsert: true }
    );
  }
};

module.exports = { syncEmails };
