import React, { useContext, useState } from 'react'
import { UserContext } from '../../context/UserProvider'

const initInputs = {
  description: ""
}

const CommentForm = (props) => {
  const [inputs, setInputs] = useState(initInputs)
  // const {addComment} = props
  const {
    addComment
  } = useContext(UserContext)

  const handleChange = (e) =>{
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addComment(inputs)
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
        placeholder="Description"/>
      <button>Comment</button>
    </form>
  )
}

export default CommentForm