const User = require("../models/UserSchema");
const axios = require("axios");
const qs = require("querystring");
const { oauth } = require("../config/config");

const getOutlookAuthUrl = (req, res) => {
  const authUrl =
    `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
    `client_id=${oauth.outlook.clientId}&` +
    `response_type=code&` +
    `redirect_uri=${encodeURIComponent(oauth.outlook.callbackURL)}&` +
    `scope=${encodeURIComponent(oauth.outlook.scopes.join(" "))}`;

  res.redirect(authUrl);
};

const handleOutlookCallback = async (req, res) => {
  const { code } = req.query;

  try {
    const tokenResponse = await axios.post(
      "https://login.microsoftonline.com/common/oauth2/v2.0/token",
      qs.stringify({
        client_id: oauth.outlook.clientId,
        client_secret: oauth.outlook.clientSecret,
        code,
        redirect_uri: oauth.outlook.callbackURL,
        grant_type: "authorization_code",
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token, refresh_token } = tokenResponse.data;

    // Get user info from Microsoft Graph
    const userResponse = await axios.get(
      "https://graph.microsoft.com/v1.0/me",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    let user = await User.findOne({ email: userResponse.data.mail });
    if (!user) {
      user = new User({
        name: userResponse.data.displayName,
        email: userResponse.data.mail,
      });
    }

    user.outlook.accessToken = access_token;
    user.outlook.refreshToken = refresh_token;
    await user.save();

    res.redirect(`/profile?userId=${user._id}`); // Redirect to a profile page
  } catch (error) {
    console.error("Error handling Outlook callback:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

module.exports = { getOutlookAuthUrl, handleOutlookCallback };
