const express = require("express")
const commentRouter = express.Router()
const Comment = require('../models/comment.js')

// Get All Comments
commentRouter.get("/", (req, res, next) => {
  Comment.find((err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

// Get Comments by issue id
commentRouter.get("/:issueId", (req, res, next) => {
  Comment.find({ issue: req.params.issueId }, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})

// Add new Comment
commentRouter.post("/:issueId", (req, res, next) => {
  req.body.author = req.auth._id
  req.body.issue = req.params.issueId
  console.log(req)
  const newComment = new Comment(req.body)
  newComment.save((err, savedComment) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedComment)
  })
})

// // Delete Comment
// commentRouter.delete("/:commentId", (req, res, next) => {
//   Comment.findOneAndDelete(
//     { _id: req.params.commentId, author: req.auth._id },
//     (err, deletedComment) => {
//       if(err){
//         res.status(500)
//         return next(err)
//       }
//       console.log(req.params)
//       return res.status(200).send(`Successfully delete comment: ${deletedComment}`)
//     }
//   )
// })

// // Update Comment
// commentRouter.put("/:commentId", (req, res, next) => {
//   Comment.findOneAndUpdate(
//     { _id: req.params.commentId, author: req.auth._id },
//     req.body,
//     { new: true },
//     (err, updatedComment) => {
//       if(err){
//         res.status(500)
//         return next(err)
//       }
//       return res.status(201).send(updatedComment)
//     }
//   )
// })

// Delete Issue
commentRouter.delete("/:issueId", (req, res, next) => {
  Comment.findOneAndDelete(
    { _id: req.params.issueId, user: req.auth._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete Issue: ${deletedIssue.description}`)
    }
  )
})

// Update Comment
commentRouter.put("/:issueId", (req, res, next) => {
  Comment.findOneAndUpdate(
    { _id: req.params.issueId, user: req.auth._id },
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

// Upvote Comment
commentRouter.put('/upvote/:commentId', (req, res, next)=>{
  Comment.findOne(
    { _id: req.params.commentId },
    (err, comment) => {
      if(err){
          res.status(500)
          return next(err)
      }
      const userIdMatch = (element) => element == req.auth._id
      const userPreviouslyLiked = comment.likes.findIndex(userIdMatch) > -1
      const userPreviouslyDisliked = comment.dislikes.findIndex(userIdMatch) > -1
      // if the user previously disliked the post, this will remove the dislike
      if (userPreviouslyDisliked) {
        Comment.updateOne(
          { _id: req.params.commentId },
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
      // if the user previously liked the post, this will remove the like when the like route is called again
      if (userPreviouslyLiked) {
        Comment.updateOne(
          { _id: req.params.commentId },
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
        // adds user _id to likes array  
        Comment.updateOne(
          { _id: req.params.commentId },
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
          // If you decide to save liked posts on the user model as well, this would add issue ids to an array named likedPosts
          // User.updateOne(
          //     { _id: req.auth._id },
          //     { $addToSet: {likedPosts: req.params.issueId}},
          //     { new: true },
          //     (err, updatedUser) => {
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

// downvote/dislike comment, see upvote route for explanations
commentRouter.put('/downvote/:commentId', (req, res, next) => {
  Comment.findOne(
    { _id: req.params.commentId },
    (err, comment) => {
      if(err){
          res.status(500)
          return next(err)
      }
      const userIdMatch = (element) => element == req.auth._id
      const userPreviouslyDisliked = comment.dislikes.findIndex(userIdMatch) > -1
      const userPreviouslyLiked = comment.likes.findIndex(userIdMatch) > -1
      if (userPreviouslyLiked) {
        Comment.updateOne(
          { _id: req.params.commentId },
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
      if (userPreviouslyDisliked) {
        Comment.updateOne(
          { _id: req.params.commentId },
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
        Comment.updateOne(
          { _id: req.params.commentId },
          { $addToSet: {dislikes: req.auth._id}},
          { new: true },
          (err, downvotedComment) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            console.log(downvotedComment, "downvotedComment")
            return res.status(201).send(downvotedComment)
          }
        )
          // User.updateOne(
          //     { _id: req.auth._id },
          //     { $addToSet: {dislikedPosts: req.params.issueId}},
          //     { new: true },
          //     (err, updatedUser) => {
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

module.exports = commentRouter