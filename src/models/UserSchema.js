const mongoose = require("mongoose");
const { generateLocalId } = require("../utils");

const userSchema = new mongoose.Schema({
  localId: {
    type: String,
  },

  name: { type: String },
  email: { type: String, required: true, unique: true },
  google: {
    accessToken: String,
    refreshToken: String,
    expiryDate: Date,
  },
  outlook: {
    outlookId: String,
    accessToken: String,
    refreshToken: String,
    expiryDate: Date,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  user.localId = generateLocalId();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
