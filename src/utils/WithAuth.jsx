import React from 'react';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';

const WithAuth = (Component) => {
  return (props) => {
    if (!auth.currentUser) {
        console.log('auth.current use ris ',auth)
      // Redirect to the home page if the user is not authenticated
      return <Navigate to="/" />;
    }

    // If authenticated, render the wrapped component with its props
    return <Component {...props} />;
  };
};

export default WithAuth;
