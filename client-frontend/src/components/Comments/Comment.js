import React from 'react'

const Comment = (props) => {
  // const { title, description, imgUrl, _id} = props
  const { title, description} = props
  return (
    <div className="comment">
      <h1>{title}</h1>
      <h3>{description}</h3>
    </div>
  )
}

export default Comment