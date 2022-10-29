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
    ref: "Todo",
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Comment", commentSchema)