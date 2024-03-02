const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  city: String,
  country: String,
  chatId: Number,
  status:Number
});

const User = mongoose.model("User", userSchema);

module.exports = User;
