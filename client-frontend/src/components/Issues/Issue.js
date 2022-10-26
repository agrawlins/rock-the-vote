import React, {useState} from 'react'
import CommentForm from '../Comments/CommentForm'
import ThumbsUp from '../Images/thumbsUp.png'

export default function Issue(props){
  // const { title, description, imgUrl, _id} = props
  const { title, description, likes, dislikes, addComment } = props
  const [toggle, setToggle] = useState(false)

  function toggleForm(){
    setToggle(prev => !prev)
  }

  return (
    <div className="issue">
      <p>Created by {}
        Likes
        <button>
          <img className='thumbsUp' src={ThumbsUp} />
        </button>
        Dislikes
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
    </div>
  )
}