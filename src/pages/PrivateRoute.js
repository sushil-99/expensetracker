import React from 'react'
import { Navigate} from 'react-router-dom'

export const PrivateRoute = ({children}) => {
   
    const loggedIn = false

  return loggedIn ? children: <Navigate to = "/"/>
  
}
