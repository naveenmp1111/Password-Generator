import React from 'react'
import { auth, provider, } from '../firebase/index'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate hook
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('user is ', user);
  
      if (user) {
        navigate('/home'); // Programmatic navigation
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log('error is ', error);
    }
  };
  return (
    <div className='h-svh flex justify-center items-center w-full bg-cover' style={{ "background": "url('https://res.cloudinary.com/dwxhfdats/image/upload/v1722612846/cdefpcbxnrmcts1twuu4.jpg')" }}>
      <div className='h-[500px] w-[500px] bg-orange-200 rounded-xl flex flex-col justify-between p-10'>


        <p className='h-[350px] bg-red-400 p-3 break-words rounded-lg text-white font-semibold text-xl'>sdfjslffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffjlfj</p>




        <button className='bg-red-500 p-3 px-16 rounded-lg text-white font-bold text-xl' onClick={GoogleLogin}>Continue With Google</button>
      </div>

      {/* <button onClick={Logout}>Logout</button> */}
    </div>
  )
}

export default Login