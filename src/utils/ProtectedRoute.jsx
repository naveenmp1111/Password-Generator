import React from 'react';
import { auth } from '../firebase';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  console.log('location is ',location.pathname)
  console.log('location to ',auth,location.pathname)
  if (auth.currentUser && location.pathname === '/') {
    console.log('location to ',auth.currentUser,location.pathname)
    // If the user is authenticated and tries to go to '/', redirect back to the previous route
    return <Navigate to='/generator' />;
  }

  return children;
};

export default ProtectedRoute;
