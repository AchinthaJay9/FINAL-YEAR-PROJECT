const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema(
  {
    userchat: String,
    response: String,
  },
);
const chat = mongoose.model("chat", ChatSchema);

module.exports = chat;