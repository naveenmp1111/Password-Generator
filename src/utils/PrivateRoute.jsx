import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { auth } from '../firebase';
import Header from '../components/Header';

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Replace this with a spinner or a more detailed loading indicator if needed
  }

  return isAuthenticated ? 
  <>
  <div className='h-svh  w-full'>
    <Header/>
  <Outlet /> 
  </div>
  </>
  
  : <Navigate to="/" />;
};

export default PrivateRoute;
