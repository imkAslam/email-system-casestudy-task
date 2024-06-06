module.exports = {
  clientId: "YOUR_OUTLOOK_CLIENT_ID",
  clientSecret: "YOUR_OUTLOOK_CLIENT_SECRET",
  redirectUri: "http://localhost:3000/auth/outlook/callback",
  scopes: ["User.Read", "Mail.Read", "Mail.Send"],
};
