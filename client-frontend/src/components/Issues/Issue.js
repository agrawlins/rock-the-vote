import React, {useContext, useEffect, useState} from 'react'
import { UserContext, userAxios } from '../../context/UserProvider'
import CommentForm from '../Comments/CommentForm'
import CommentList from '../Comments/CommentList'
import ThumbsUp from '../Images/thumbsUp.png'

const Issue = (props) => {
  const { _id, author, title, description, likes, dislikes, creationDate } = props
  const {
    addComment,
    upvoteIssue, 
    downvoteIssue
  } = useContext(UserContext)
  const [toggle, setToggle] = useState(false)
  const [comments, setComments] = useState([])

  const toggleForm = () => {
    setToggle(prev => !prev)
  }
  
  const getCommentsByIssueId= (_id) => {
    userAxios.get(`/api/comments/${_id}`)
        .then(res => {
            setComments(res.data)
        })
        .catch(err => console.log(err.response.data.errMsg))
  }

  useEffect(() => {
    getCommentsByIssueId(_id)
  }, [ upvoteIssue || downvoteIssue])
  

  return (
    <div className="issue">
      <div>
        <p>
            {author?.username} '{creationDate}'
        </p>
        <div>
          <button onClick={() => upvoteIssue(_id)}>
            {likes?.length}
            <img className='thumbsUp' src={ThumbsUp} />
          </button>
          <button onClick={() => downvoteIssue(_id)}>
            {dislikes?.length}
            <img className='thumbsDown' src={ThumbsUp} />
          </button>
        </div>
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
      <br/>
      Comments
      <br/>
      { !toggle ?
      <>
        <button onClick={toggleForm}>Add A Comment</button>
      </>
      :
      <>
        <CommentForm
          addComment = {addComment}
          issueId = {_id}
        />
        <button onClick={toggleForm}>Cancel</button>
      </>
      }
      <CommentList comments = {comments}/>
    </div>
  )
}

export default Issue