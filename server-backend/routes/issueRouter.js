const express = require("express")
const issueRouter = express.Router()
const Issue = require('../models/issue.js')

// Get All Issues
issueRouter.get("/", (req, res, next) => {
  Issue.find()
  .populate("author")
  .exec((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get All Comments
issueRouter.get("/comments", (req, res, next) => {
  Issue.find()
  .populate("author")
  .exec((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get Issues by user id
// issueRouter.get("/user", (req, res, next) => {
//   console.log(req.auth)
//   Issue.find({ author: req.auth._id })
//   // .populate("author")
//   // .exec((err, issues) => {
//   //   console.log(issues)
//   //   if(err){
//   //     res.status(500)
//   //     return next(err)
//   //   }
//   //   return res.status(200).send(issues)
//   // })
// })

// Add new Issue
issueRouter.post("/", (req, res, next) => {
  req.body.author = req.auth._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500) 
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

// Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, author: req.auth._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete Issue: ${deletedIssue.title}`)
    }
  )
})

// Update Issue
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, author: req.auth._id },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssue)
    }
  )
})

module.exports = issueRouter