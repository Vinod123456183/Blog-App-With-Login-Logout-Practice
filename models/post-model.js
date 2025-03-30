const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date/time
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set to the current date/time
  },
});

// Middleware to update `updatedAt` before saving
postSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
