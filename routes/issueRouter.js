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

// Get One Issue
issueRouter.get("/:issueId", (req, res, next) => {
  Issue.find()
  .populate("author")
  .exec((err, issue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issue)
  })
})

// Get Issues by author id
issueRouter.get("/search/author", (req, res, next) => {
  console.log(req.auth)
  Issue.find({ author: req.auth._id })
  .populate("author")
  .exec((err, issues) => {
    console.log(issues)
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
      return res.status(200).send(`Successfully delete Issue: ${deletedIssue}`)
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

// Upvote Issue
issueRouter.put('/upvote/:issueId', (req, res, next)=>{
  Issue.findOne(
    { _id: req.params.issueId },
    (err, issue) => {
      if(err){
          res.status(500)
          return next(err)
      }
      const authorIdMatch = (element) => element == req.auth._id
      const authorPreviouslyLiked = issue.likes.findIndex(authorIdMatch) > -1
      const authorPreviouslyDisliked = issue.dislikes.findIndex(authorIdMatch) > -1
      // if the author previously disliked the post, this will remove the dislike
      if (authorPreviouslyDisliked) {
        Issue.updateOne(
          { _id: req.params.issueId },
          { $pull: {dislikes: req.auth._id}},
          { new: true },
          (err, updatedDislike) => {
            if(err) {
                res.status(500)
                return next(err)
            }
          }
        )
      }
      // if the author previously liked the post, this will remove the like when the like route is called again
      if (authorPreviouslyLiked) {
        Issue.updateOne(
          { _id: req.params.issueId },
          { $pull: {likes: req.auth._id}},
          { new: true },
          (err, updatedLike) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedLike)
          }
        )
      } else {
        // adds author _id to likes array  
        Issue.updateOne(
          { _id: req.params.issueId },
          { $addToSet: {likes: req.auth._id}},
          { new: true },
          (err, upvotedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            console.log(upvotedIssue, "upvotedIssue")
            return res.status(201).send(upvotedIssue)
          }
        )
          // If you decide to save liked posts on the author model as well, this would add issue ids to an array named likedPosts
          // author.updateOne(
          //     { _id: req.auth._id },
          //     { $addToSet: {likedPosts: req.params.issueId}},
          //     { new: true },
          //     (err, updatedauthor) => {
          //         if(err){
          //             res.status(500)
          //             return next(err)
          //         }
          //         return res.status(201).send('Successful upvote')
          //     }
          // )
      }
    }
  )
})

// downvote/dislike issue, see upvote route for explanations
issueRouter.put('/downvote/:issueId', (req, res, next) => {
  Issue.findOne(
    { _id: req.params.issueId },
    (err, issue) => {
      if(err){
          res.status(500)
          return next(err)
      }
      const authorIdMatch = (element) => element == req.auth._id
      const authorPreviouslyDisliked = issue.dislikes.findIndex(authorIdMatch) > -1
      const authorPreviouslyLiked = issue.likes.findIndex(authorIdMatch) > -1
      if (authorPreviouslyLiked) {
        Issue.updateOne(
          { _id: req.params.issueId },
          { $pull: {likes: req.auth._id}},
          { new: true },
          (err, updatedLike) => {
            if(err) {
                res.status(500)
                return next(err)
            }
          }
        )
      }
      if (authorPreviouslyDisliked) {
        Issue.updateOne(
          { _id: req.params.issueId },
          { $pull: {dislikes: req.auth._id}},
          { new: true },
          (err, updatedDislike) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedDislike)
          }
        )
      } else {
        Issue.updateOne(
          { _id: req.params.issueId },
          { $addToSet: {dislikes: req.auth._id}},
          { new: true },
          (err, downvotedIssue) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            console.log(downvotedIssue, "downvotedIssue")
            return res.status(201).send(downvotedIssue)
          }
        )
          // author.updateOne(
          //     { _id: req.auth._id },
          //     { $addToSet: {dislikedPosts: req.params.issueId}},
          //     { new: true },
          //     (err, updatedauthor) => {
          //         if(err){
          //             res.status(500)
          //             return next(err)
          //         }
          //         return res.status(201).send('Successful downvote')
          //     }
          // )
      }
    }
  )
})


module.exports = issueRouter

// Morgan testing branch change and push