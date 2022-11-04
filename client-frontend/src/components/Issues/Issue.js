import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../../context/UserProvider'
import CommentForm from '../Comments/CommentForm'
import CommentList from '../Comments/CommentList'
import ThumbsUp from '../Images/thumbsUp.png'

const Issue = (props) => {
  // const { title, description, imgUrl, _id} = props
  const { author, title, description, likes, dislikes, creationDate, addComment } = props
  const {
    comments,
    upvoteIssue, 
    downvoteIssue
  } = useContext(UserContext)
  const [toggle, setToggle] = useState(false)

  const toggleForm = () => {
    setToggle(prev => !prev)
  }

  const checkCommentsIssues = () => {

  }

  // useEffect(() => {

  // }, [likes.length, dislikes.length]) 

  return (
    <div className="issue">
      <div>
        <p>
            {author?.username} '{creationDate}'
        </p>
        <div>
          <button onClick={upvoteIssue}>
            {likes.length}
            <img className='thumbsUp' src={ThumbsUp} />
          </button>
          <button onClick={downvoteIssue}>
            {dislikes.length}
            <img className='thumbsDown' src={ThumbsUp} />
          </button>
        </div>
      </div>
      <h1>{title}</h1>
      <h4>{description}</h4>
      { !toggle ?
      <>
        <button onClick={toggleForm}>Add A Comment</button>
      </>
      :
      <>
        <CommentForm addIssue = {addComment}/>
        <button onClick={toggleForm}>Cancel</button>
      </>
      }
      <CommentList comments = {comments}/>
    </div>
  )
}

export default Issue