import React,{ createContext } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const AuthContext=createContext()

const AuthProvider = ({children}) => {
    const navigate=useNavigate()
    const Logout = () => {
        console.log('logout function called')
        signOut(auth)
          .then(() => {
            console.log('signout successfull')
            navigate('/')
            // Sign-out successful.
          })
          .catch((error) => {
            // An error happened.  
            console.log('error in signout')
    
          });
      }
  return (
    <AuthContext.Provider value={{Logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider