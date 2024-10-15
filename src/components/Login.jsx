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
    <div className='h-svh flex justify-center items-center w-full bg-cover bg-black'
    //  style={{ "background": "url('https://res.cloudinary.com/dwxhfdats/image/upload/v1722612846/cdefpcbxnrmcts1twuu4.jpg')" }}
     >
      <div className='h-[380px] w-[500px] bg-black rounded-xl flex flex-col justify-between p-6 md:p-10'>


        <p className='h-[330px] bg-gray-400 p-5 break-words rounded-lg text-white font-bold text-8xl'>Let's Lock it.</p>
      




        <button className='bg-cyan-500 p-3 mt-5 px-16 rounded-lg text-white font-bold text-xl' onClick={GoogleLogin}>Continue With Google</button>
      </div>

      {/* <button onClick={Logout}>Logout</button> */}
    </div>
  )
}

export default Login