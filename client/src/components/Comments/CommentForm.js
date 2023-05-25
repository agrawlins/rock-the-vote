import React, { useState } from 'react'

const CommentForm = (props) => {
  const {issueId, addComment} = props
  const initInputs = {
    description: "",
    issue: {issueId},
    author: {}
  }
  const [inputs, setInputs] = useState(initInputs)

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addComment(issueId, inputs)
    setInputs(initInputs)
  }

  const { description } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"
      />
      <button>Add Comment</button>
    </form>
  )
}

export default CommentForm