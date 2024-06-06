const passport = require("passport");
const User = require("../models/UserSchema");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const OutlookStrategy = require("passport-outlook").Strategy;
const { oauth } = require("../config/config");

passport.use(
  new GoogleStrategy(
    {
      clientID: oauth.google.clientId,
      clientSecret: oauth.google.clientSecret,
      callbackURL: oauth.google.redirectUri,
      scope: oauth.google.scopes,
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value })
        .then((user) => {
          if (user) {
            user.google = {
              accessToken: accessToken,
              refreshToken: refreshToken,
              expiryDate: new Date().getTime() + 3600000,
            };
          } else {
            user = new User({
              email: profile.emails[0].value,
              google: {
                accessToken: accessToken,
                refreshToken: refreshToken,
                expiryDate: new Date().getTime() + 3600000,
              },
            });
          }
          return user.save();
        })
        .then((user) => done(null, user))
        .catch((err) => done(err));
    }
  )
);
passport.use(
  new OutlookStrategy(
    {
      clientID: oauth.outlook.clientId,
      clientSecret: oauth.outlook.clientSecret,
      callbackURL: oauth.outlook.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = new User({
            email:
              profile.emails && profile.emails.length > 0
                ? profile.emails[0].value
                : null,
            displayName: profile?.displayName,
            outlook: {
              outlookId: profile.id,
              accessToken: accessToken,
              refreshToken: refreshToken,
            },
          });
          await user.save();
        }
        user.outlook.accessToken = accessToken;
        user.outlook.refreshToken = refreshToken;
        await user.save();

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({
      outlook: {
        outlookId: id,
      },
    });
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
