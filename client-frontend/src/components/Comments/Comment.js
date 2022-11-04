import React from 'react'

const Comment = (props) => {
  // const { title, description, imgUrl, _id} = props
  const { author, creationDate, description} = props
  return (
    <div className="comment">
      {author?.username} '{creationDate}'
      <h3>{description}</h3>
    </div>
  )
}

export default Comment