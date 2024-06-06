const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  subject: String,
  body: String,
  from: String,
  to: String,
  date: Date,
  isFlagged: Boolean,
  provider: String, // 'outlook' or 'google'
  outlookId: String,
});

module.exports = mongoose.model("Email", EmailSchema);
