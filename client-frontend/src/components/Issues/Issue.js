import React, {useContext, useState} from 'react'
import { UserContext } from '../../context/UserProvider'
import CommentForm from '../Comments/CommentForm'
// import CommentList from '../Comments/CommentList'
import ThumbsUp from '../Images/thumbsUp.png'

export default function Issue(props){
  // const { title, description, imgUrl, _id} = props
  const { user, title, description, likes, dislikes, addComment } = props
  const {
    addIssue, 
    issues,
    comments
  } = useContext(UserContext)
  const [toggle, setToggle] = useState(false)

  function toggleForm(){
    setToggle(prev => !prev)
  }

  return (
    <div className="issue">
      <p>{user}
        {likes.length}
        <button>
          <img className='thumbsUp' src={ThumbsUp} />
        </button>
        {dislikes.length}
        <button>
          <img className='thumbsDown' src={ThumbsUp} />
        </button>
      </p>
      <h1>{title}</h1>
      <p>{description}</p>
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
      {/* <CommentList comments = {comments}/> */}
    </div>
  )
}