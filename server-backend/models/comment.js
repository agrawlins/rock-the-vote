const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  likes: [{
    ref: "User",
    type: Schema.Types.ObjectId
  }],
  dislikes: [{
    ref: "User",
    type: Schema.Types.ObjectId
  }],
  issue: {
    type: Schema.Types.ObjectId,
    ref: "Issue"
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Comment", commentSchema)