import { useContext, useState } from 'react'
import Generator from './components/Generator'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Login from './components/Login';
import PasswordListing from './components/PasswordListing';
import { AuthContext } from './contexts/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import LoginRoute from './utils/LoginRoute';
// import WithAuth from './utils/WithAuth';
// import ProtectedRoute from './utils/ProtectedRoute';


function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()
  const { Logout } = useContext(AuthContext)


  return (
    <>
      <div className='flex justify-center items-center '>
        <Routes>
          <Route element={<LoginRoute />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Generator />} />
            <Route path="/passwords" element={<PasswordListing />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} /> {/* Redirect all unknown routes to login */}
        </Routes>
      </div>
    </>
  )
}

export default App
