const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const {expressjwt} = require('express-jwt')

process.env.SECRET

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(
  process.env.VOTE_URL,
  () => console.log('Connected to the DB')
)

app.use('/auth', require('./routes/authRouter'))
app.use('/api', expressjwt({secret: process.env.SECRET, algorithms: ['HS256']})) // req.user
app.use('/api/opinion', require('./routes/opinionRouter.js'))
app.use('/api/opinion/comment', require('./routes/commentRouter.js'))


app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

app.listen(4000, () => {
  console.log(`Server is running on local port 4000`)
})