import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from '../../context/UserProvider'
import ThumbsUp from '../Images/thumbsUp.png'


const Comment = (props) => {
  // const { title, description, imgUrl, _id} = props
  const { author, creationDate, description, likes, dislikes} = props
  const {
    upvoteComment, 
    downvoteComment
  } = useContext(UserContext)


  return (
    <div className="comment">
      <div>
        <p>
            {author?.username} '{creationDate}'
        </p>
        <div>
          <button onClick={upvoteComment}>
            {likes.length}
            <img className='thumbsUp' src={ThumbsUp} />
          </button>
          <button onClick={downvoteComment}>
            {dislikes.length}
            <img className='thumbsDown' src={ThumbsUp} />
          </button>
        </div>
      </div>
      <h3>{description}</h3>
    </div>
  )
}

export default Comment