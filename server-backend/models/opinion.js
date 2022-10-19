const mongoose = require('mongoose')
const Schema = mongoose.Schema

const opinionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  imgUrl: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

module.exports = mongoose.model("Opinion", opinionSchema)