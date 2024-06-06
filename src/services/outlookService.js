const graph = require("@microsoft/microsoft-graph-client");
const Email = require("../models/EmailSchema");

const getAuthenticatedClient = (accessToken) => {
  return graph.Client.init({
    authProvider: (done) => {
      done(null, accessToken);
    },
  });
};

const syncOutlookEmails = async (accessToken, userId) => {
  const client = getAuthenticatedClient(accessToken);

  try {
    let messages = await client.api("/me/messages").top(50).get();

    for (let message of messages.value) {
      const existingEmail = await Email.findOne({
        user: userId,
        provider: "outlook",
        outlookId: message.id,
      });

      if (!existingEmail) {
        await Email.create({
          user: userId,
          subject: message.subject,
          body: message.body.content,
          from: message.from.emailAddress.address,
          to: message.toRecipients
            .map((r) => r.emailAddress.address)
            .join(", "),
          date: message.receivedDateTime,
          isFlagged: false,
          provider: "outlook",
          outlookId: message.id,
        });
      }
    }

    console.log("Outlook emails synced successfully");
  } catch (error) {
    console.error("Error syncing Outlook emails:", error);
    throw error;
  }
};

const sendOutlookEmail = async (accessToken, emailData) => {
  const client = getAuthenticatedClient(accessToken);

  try {
    const sendMail = {
      message: {
        subject: emailData.subject,
        body: {
          contentType: "Text",
          content: emailData.body,
        },
        toRecipients: [
          {
            emailAddress: {
              address: emailData.to,
            },
          },
        ],
      },
      saveToSentItems: true,
    };

    await client.api("/me/sendMail").post(sendMail);
    console.log("Outlook email sent successfully");
  } catch (error) {
    console.error("Error sending Outlook email:", error);
    throw error;
  }
};

const findAllEmails = async () => {
  return await Email.find();
};

module.exports = { syncOutlookEmails, sendOutlookEmail, findAllEmails };
