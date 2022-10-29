import React from 'react'
import Issue from './Issue.js'

const IssueList = (props) => {
  const {issues, user} = props
  return (
    <div className="issue-list">
      {issues.map(issue => <Issue {...issue} key={issue._id}/>)}
    </div>
  )
}

export default IssueList