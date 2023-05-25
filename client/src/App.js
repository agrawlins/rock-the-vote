import React, {useContext} from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Authentication/Auth.js'
import Public from './components/Public.js'
import Profile from './components/Profile.js'
import ProtectedRoute from './components/ProtectedRoute.js'
import { UserContext } from './context/UserProvider.js'

const App = () => {
  const {token, logout} = useContext(UserContext)
  return (
    <div className="app">
      {token && <Navbar logout={logout}/>}
      <Routes>
        <Route 
          path="/" 
          element={token ? <Navigate to="/public"/> : <Auth />}
        />
        <Route 
          path="/public"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Public />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App