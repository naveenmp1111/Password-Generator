import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

const Header = () => {
    const { Logout } = useContext(AuthContext)
    const location=useLocation()
    const navigate=useNavigate()
    return (
        <div className='w-full h-20 bg-black flex justify-between p-7 px-10'>
            <h2 className='text-white text-2xl font-bold'>LOCK IT UP.</h2>
            <div>
                {location.pathname=='/home' ? 
                <span onClick={()=>navigate('/passwords')} className='text-white mx-2 cursor-pointer hover:bg-gray-700 hover:scale-105 px-4 p-2 rounded-lg transition duration-300 ease-in-out'>SAVED</span> :
                <span onClick={()=>navigate('/home')} className='text-white mx-2 cursor-pointer hover:bg-gray-700 hover:scale-105 px-4 p-2 rounded-lg transition duration-300 ease-in-out'>HOME</span>
            }
                
                
                <span onClick={Logout} className='text-red-600 cursor-pointer font-semibold mx-3 hover:bg-gray-700 hover:scale-105 p-2 px-3 rounded-lg transition duration-300 ease-in-out'>Logout</span>
            </div>
        </div>
    )
}

export default Header