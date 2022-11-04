import React from 'react'
import Comment from './Comment.js'

const CommentList = (props) => {
  const {comments, issues} = props
  return (
    <div className="comment-list">
      {comments.map(comment => <Comment {...comment} key={comment._id}/>)}
    </div>
  )
}

export default CommentList