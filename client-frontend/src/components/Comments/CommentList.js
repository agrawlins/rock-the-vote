import React from 'react'
import Comment from './Issues/Issue.js'

export default function CommentList(props){
  const {comments} = props
  return (
    <div className="comment-list">
      {comments.map(comment => <Comment {...comment} key={comment._id}/>)}
    </div>
  )
}