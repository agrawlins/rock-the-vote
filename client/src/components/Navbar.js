import React, {useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserProvider.js'

const Navbar = (props) => {
  const {
    user: {
      username
    }
  } = useContext(UserContext)
  const {logout} = props
  return (
    <div className="navbar">
      <h1>{username}</h1>
      <button>
        <Link to="/profile">Profile</Link>
      </button>
      <button>
        <Link to="/public">Public</Link>
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Navbar