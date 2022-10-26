import React, {useContext, useEffect, useState} from 'react'
import IssueList from './Issues/IssueList.js'
import { UserContext } from '../context/UserProvider.js'


export default function Public(){
  const {
    userState,
    user: {
      username
    },
    getAllIssues, 
    issues
  } = useContext(UserContext)
  const [allIssues, setAllIssues] = useState([])

  return (
    <div className="public">
      <IssueList
        issues={userState}
      />
    </div>
  )
}