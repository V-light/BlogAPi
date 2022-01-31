const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: [true, 'title is required'],
        unique: true
    },
    desc: {
        type: String,
        required: [true, 'desc is required'],
    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: [true, 'username is required'],
    },
    categories: {
        type : Array,
        required: false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
