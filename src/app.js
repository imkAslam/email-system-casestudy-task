const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");
// const { oauth } = require("../src/config/config");
// const session = require("express-session");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const app = express();

// requests limiter max 100 requests in 15 mins
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

// middlewares
app.use(limiter);
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(
//   session({
//     secret: oauth.sessionSecret,
//     resave: false,
//     saveUninitialized: false,
//     cookie: { secure: false },
//   })
// );

// routes
app.use("/auth", authRoutes);
app.use("/emails", emailRoutes);

app.get("/", (_req, res) => {
  res.send("welcome to the nodejs server");
});
app.get("/profile", (req, res) => {
  const userId = req.query.userId;
  // Render a profile page with user info and email management options
  res.send(`Profile page for user ${userId}`);
});

module.exports = app;
