const express = require("express")
const opinionRouter = express.Router()
const Opinion = require('../models/opinion.js')

// Get All Opinions
opinionRouter.get("/", (req, res, next) => {
  Opinion.find((err, opinions) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(opinions)
  })
})

//Get Opinions by user id
opinionRouter.get("/user", (req, res, next) => {
  Opinion.find({user: req.auth._id}, (err, opinions) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(opinions)
  })
})

// Add new Opinion
opinionRouter.post("/", (req, res, next) => {
  req.body.user = req.auth._id
  const newOpinion = new Opinion(req.body)
  newOpinion.save((err, savedOpinion) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedOpinion)
  })
})

// Delete Opinion
opinionRouter.delete("/:opinionId", (req, res, next) => {
  Opinion.findOneAndDelete(
    { _id: req.params.opinionId, user: req.auth._id},
    (err, deletedOpinion) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete opinion: ${deletedOpinion.title}`)
    }
  )
})

// Update Opinion
opinionRouter.put("/:opinionId", (req, res, next) => {
  Opinion.findOneAndUpdate(
    { _id: req.params.opinionId, user: req.auth._id},
    req.body,
    { new: true },
    (err, updatedOpinion) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedOpinion)
    }
  )
})

module.exports = opinionRouter