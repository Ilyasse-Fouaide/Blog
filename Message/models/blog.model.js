const mongoose = require('mongoose');
const { User } = require("./user.model");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String
    },
    desc: {
      type: String
    },
    image: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User
    }
  }, { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = { Blog }
