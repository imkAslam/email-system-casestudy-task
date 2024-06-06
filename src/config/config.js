require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  mongoURI: process.env.MONGODB_URI,
  oauth: {
    sessionSecret: process.env.SESSION_SECRET,
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      redirectUri: process.env.GOOGLE_REDIRECT_URI,
      scopes: [
        "https://www.googleapis.com/auth/gmail.send",
        "https://www.googleapis.com/auth/gmail.readonly",
      ],
    },
    outlook: {
      clientId: process.env.OUTLOOK_CLIENT_ID,
      tenantId: process.env.OUTLOOK_TENANT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
      callbackURL: process.env.OUTLOOK_CALLBACK_URL,
      redirectUri: process.env.OUTLOOK_REDIRECT_URI,
      scopes: ["User.Read", "Mail.Read", "Mail.Send"],
      // scopes: [
      //   "openid",
      //   "profile",
      //   "offline_access",
      //   "https://outlook.office.com/mail.read",
      //   "https://outlook.office.com/mail.send",
      // ],
    },
  },

  smtp: {
    service: "gmail", // your SMTP service
    host: "smtp.gmail.com", // your SMTP host
    port: 465, // your SMTP port
    secure: true, // true for 465, false for other ports
  },
  imap: {
    host: "imap.gmail.com", // your IMAP host
    port: 993, //  your IMAP port
    tls: true, // true for 993, false for other ports
  },
};
