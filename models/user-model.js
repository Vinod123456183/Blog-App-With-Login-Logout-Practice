const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9$./]+$/, // ✅ Now allows bcrypt hashed passwords
  },
});

const User = mongoose.model("user", userSchema);
module.exports = User;
