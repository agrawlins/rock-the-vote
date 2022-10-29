import React from 'react'

const Navbar = (props) => {
  const {logout} = props
  return (
    <div className="navbar">
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar