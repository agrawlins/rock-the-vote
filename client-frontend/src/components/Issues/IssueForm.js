import React, { useState } from 'react'

const initInputs = {
  title: "",
  description: "",
}

const IssueForm = (props) => {
  const [inputs, setInputs] = useState(initInputs)
  const {addIssue} = props

  const handleChange = (e) => {
    const {name, value} = e.target
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addIssue(inputs)
    setInputs(initInputs)
  }

  const { title, description } = inputs
  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="title" 
        value={title} 
        onChange={handleChange} 
        placeholder="Title"/>
      <input 
        type="text" 
        name="description" 
        value={description} 
        onChange={handleChange} 
        placeholder="Description"/>
      <button>Add Issue</button>
    </form>
  )
}

export default IssueForm