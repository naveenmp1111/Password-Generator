import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import AuthProvider from './contexts/AuthContext.jsx';
import { ToastContainer, Slide, Zoom, Flip, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer
        transition={Flip}
        position="top-center"
        autoClose={1000}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable
        toastStyle={{ backgroundColor: '#333333', color: '#fff' }} // Default style
        className="text-white font-bold p-4 mt-16"
        theme="dark"
      />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
