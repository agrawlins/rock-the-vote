import React, { useContext } from 'react'
import { UserContext } from '../../context/UserProvider.js'
import Comment from './Comment.js'

const CommentList = (props) => {
  const {getCommentsByIssueId} = useContext(UserContext)
  const {comments} = props
  return (
    <div className="comment-list">
      {comments.map(comment => <Comment {...comment} key={comment._id}/>)}
    </div>
  )
}

export default CommentList