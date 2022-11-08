import React, {useContext, useEffect} from 'react'
import IssueForm from './Issues/IssueForm.js'
import IssueList from './Issues/IssueList.js'
import { UserContext } from '../context/UserProvider.js'

const Public = () => {
  const {
    // user: {
    //   username
    // }, 
    addIssue, 
    issues
  } = useContext(UserContext)


  return (
      <div className="profile">
        <h1>Create a New Issue</h1>
        <IssueForm addIssue = {addIssue}/>
        <h1>CURRENT ISSUES</h1>
        <IssueList issues={issues}/>
      </div>
  )
}

export default Public