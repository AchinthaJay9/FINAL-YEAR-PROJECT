const mongoose = require("mongoose");

const UserDetailSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: { type: String, unique: true },
    password: String,
    
  
  },
);
const user = mongoose.model("UserInfo", UserDetailSchema);

module.exports = user;