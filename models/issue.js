const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
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
  creationDate: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Issue", issueSchema)